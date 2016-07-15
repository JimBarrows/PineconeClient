import React from "react";
import * as UserActions from "../actions/UserActions";
import {UserEventNames} from "../constants";
import UserStore from "../stores/UserStore";
import PageHeader from "../components/bootstrap/PageHeader";
import FormGroup from "../components/bootstrap/FormGroup";
import Alert from "../components/bootstrap/Alert";

export default class Login extends React.Component {

	constructor() {
		super();
		this.state            = {
			username: ""
			, password: ""
			, error: null
			, userLoginBegins: false
		};
		this.userLoginBegins  = this.userLoginBegins.bind(this);
		this.userLoginFailure = this.userLoginFailure.bind(this);
		this.handleChange     = this.handleChange.bind(this);
	}

	componentWillMount() {
		UserStore.on(UserEventNames.USER_LOGIN_FAILURE, this.userLoginFailure);
		UserStore.on(UserEventNames.USER_LOGIN_BEGINS, this.userLoginBegins);
	}

	componentWillUnmount() {
		UserStore.removeListener(UserEventNames.USER_LOGIN_FAILURE, this.userLoginFailure);
		UserStore.removeListener(UserEventNames.USER_LOGIN_BEGINS, this.userLoginBegins);
	}

	userLoginFailure(username, error) {
		this.setState({
			error: error
			, userLoginBegins: false
		})
	}

	userLoginBegins() {
		this.setState({
			userLoginBegins: true
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
		let {error, usernameError, passwordError, userLoginBegins} = this.state;
		return (
				<div class="login">
					<PageHeader title="Login"/>
					<Alert error={error}/>
					<FormGroup label="Username" type="text" placeholder="bob@email.com" name="username"
					           onChange={this.handleChange.bind(this)} error={usernameError}/>
					<FormGroup label="Password" type="password" name="password" error={passwordError}
					           onChange={this.handleChange.bind(this)}/>
					<button type="button" class="btn btn-primary" id="loginButton" onClick={this.login.bind(this)}
					        disabled={userLoginBegins}>Login
					</button>
					<button type="button" class="btn btn-default" id="cancelButton" disabled={userLoginBegins}>Cancel</button>
				</div>
		);
	}
}