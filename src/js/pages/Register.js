import React from "react";
import PageHeader from "../components/bootstrap/PageHeader";
import FormGroup from "../components/bootstrap/FormGroup";
import Alert from "../components/bootstrap/Alert";
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
			, passowrdError: null
			, usernameError: null
			, registerUserSuccess: false
			, error: null
			, registrationBegins: false
		};

		this.registerBegins  = this.registerBegins.bind(this);
		this.registerFailure = this.registerFailure.bind(this);
	}

	componentWillMount() {
		UserStore.on(UserEventNames.REGISTER_USER_BEGINS, this.registerBegins);
		UserStore.on(UserEventNames.REGISTER_USER_FAILURE, this.registerFailure);
	}

	componentWillUnmount() {
		UserStore.removeListener(UserEventNames.REGISTER_USER_BEGINS, this.registerBegins);
		UserStore.removeListener(UserEventNames.REGISTER_USER_FAILURE, this.registerFailure);
	}

	registerBegins() {
		this.setState({
			registrationBegins: true
			, error: null
		});
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
		let valid = true;
		let re    = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
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
		let {passwordError, passwordMatchError, passwordConfirmError, usernameError, error, registrationBegins} = this.state;
		let alertError = passwordMatchError || (error && error.data);
		return (
				<div class="register">
					<PageHeader title="Register"/>
					<Alert error={alertError}/>
					<FormGroup label="Username" type="text" placeholder="bob@email.com" name="username"
					           onChange={this.handleChange.bind(this)} error={usernameError}/>
					<FormGroup label="Password" type="password" name="password" error={passwordError}
					           onChange={this.handleChange.bind(this)}/>
					<FormGroup label="Confirm Password" type="password" name="confirmPassword"
					           onChange={this.handleChange.bind(this)} error={passwordConfirmError}/>

					<button id="registerButton" type="button" class="btn btn-default" onClick={this.register.bind(this)}
					        disabled={registrationBegins}>Register
					</button>
					<button type="button" class="btn btn-default" disabled={registrationBegins}>Cancel</button>
				</div>
		);
	}
}
