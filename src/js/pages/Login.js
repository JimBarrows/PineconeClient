import React from "react";
import * as UserActions from "../actions/UserActions";
import {UserEventNames} from "../constants";
import UserStore from "../stores/UserStore";
import {DangerAlert, PageHeader, PasswordFormGroup, TextFormGroup} from "bootstrap-react-components";

export default class Login extends React.Component {

	constructor() {
		super();
		this.state            = {
			username: ""
			, password: ""
			, error: null
			, userLoginBegins: false
		};
		this.userLoginFailure = this.userLoginFailure.bind(this);
		this.handleChange     = this.handleChange.bind(this);
	}

	componentWillMount() {
		UserStore.on(UserEventNames.USER_LOGIN_FAILURE, this.userLoginFailure);
	}

	componentWillUnmount() {
		UserStore.removeListener(UserEventNames.USER_LOGIN_FAILURE, this.userLoginFailure);
	}

	userLoginFailure(username, error) {
		this.setState({
			error: error
			, userLoginBegins: false
		})
	}

	handleChange(event) {
		switch (event.target.id) {
			case "username":
				this.setState({username: event.target.value});
				break;
			case "password":
				this.setState({password: event.target.value});
				break;
		}
	}

	login() {
		let {username, password} = this.state;
		UserActions.login(username, password);
	}

	render() {
		let {error, usernameError, passwordError} = this.state;
		return (
				<div class="login">
					<PageHeader title="Login"/>
					<DangerAlert error={error}/>
					<TextFormGroup label="Username" type="text" placeholder="bob@email.com" name="username"
					               onChange={this.handleChange.bind(this)} error={usernameError}/>
					<PasswordFormGroup label="Password" type="password" name="password" error={passwordError}
					                   onChange={this.handleChange.bind(this)}/>
					<button type="button" class="btn btn-primary" id="loginButton" onClick={this.login.bind(this)}>Login</button>
					<button type="button" class="btn btn-default" id="cancelButton">Cancel</button>
				</div>
		);
	}
}