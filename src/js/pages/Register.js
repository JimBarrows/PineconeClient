import React from "react";
import {DangerAlert, PasswordFormGroup, TextFormGroup, PageHeader} from "bootstrap-react-components";
import * as UserActions from "../actions/UserActions";
import {UserEventNames} from "../constants";
import UserStore from "../stores/UserStore";

export default class Register extends React.Component {

	constructor() {
		super();
		this.state = {
			username: ""
			, password: ""
			, confirmPassword: ""
			, passwordMatchError: null
			, passwordError: null
			, usernameError: null
			, registerUserSuccess: false
			, error: null
			, registrationBegins: false
		};

		this.registerFailure = this.registerFailure.bind(this);
	}

	componentWillMount() {
		UserStore.on(UserEventNames.REGISTER_USER_FAILURE, this.registerFailure);
	}

	componentWillUnmount() {
		UserStore.removeListener(UserEventNames.REGISTER_USER_FAILURE, this.registerFailure);
	}

	registerFailure(reason) {
		this.setState({
			registerUserSuccess: false
			, registrationBegins: false
			, error: reason
		});
	}

	handleChange(event) {
		switch (event.target.id) {
			case "username":
				this.setState({username: event.target.value});
				break;
			case "password":
				this.setState({password: event.target.value});
				break;
			case "confirmPassword":
				this.setState({confirmPassword: event.target.value});
				break;
		}
	}

	register() {
		let {username, password, confirmPassword} = this.state;
		let valid                                 = true;
		let re                                    = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
		if (re.test(username)) {
			this.setState({
				usernameError: null
			})
		} else {
			this.setState({
				usernameError: "Username is invalid"
			});
			valid = false
		}
		if (password.length < 8) {
			this.setState({passwordError: "Password must be at least 8 characters."});
			valid = false;
		} else if (password !== confirmPassword) {
			this.setState({
				passwordMatchError: "Passwords do not match."
			});
			valid = false
		}
		if (valid) {
			UserActions.registerUser(username, password);
		}
	}

	render() {
		let {passwordError, passwordMatchError, passwordConfirmError, usernameError, error} = this.state;
		let alertError                                                                      = passwordMatchError || (error && error.data);
		return (
				<div class="register">
					<PageHeader >
						<h1>Register</h1>
					</PageHeader>
					<DangerAlert id="registerDangerAlert" error={alertError}/>
					<TextFormGroup label="Username" type="text" placeholder="bob@email.com" id="username"
					               onChange={this.handleChange.bind(this)} error={usernameError}/>
					<PasswordFormGroup label="Password" type="password" id="password" error={passwordError}
					                   onChange={this.handleChange.bind(this)}/>
					<PasswordFormGroup label="Confirm Password" type="password" id="confirmPassword"
					                   onChange={this.handleChange.bind(this)} error={passwordConfirmError}/>

					<button id="registerButton" type="button" class="btn btn-default" onClick={this.register.bind(this)}>
						Register
					</button>
					<button type="button" class="btn btn-default">Cancel</button>
				</div>
		);
	}
}
