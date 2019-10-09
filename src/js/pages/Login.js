import {Alert, PageHeader, PasswordFormGroup, TextFormGroup} from "bootstrap-react-components"
import React                                                 from "react"
import * as UserActions                                      from "../actions/AccountActions"
import {UserEventNames}                                      from "../constants"
import UserStore                                             from "../stores/UserStore"

export default class Login extends React.Component {

	constructor () {
		super()
		this.state={
			username         : ""
			, password       : ""
			, passwordError  : null
			, usernameError  : null
			, userLoginBegins: false
		}
	}

	componentDidMount () {
		UserStore.on(UserEventNames.USER_LOGIN_FAILURE, this.userLoginFailure)
	}

	componentWillUnmount () {
		UserStore.removeListener(UserEventNames.USER_LOGIN_FAILURE, this.userLoginFailure)
	}

	userLoginFailure=(username, error) => {
		this.setState({
										error            : error
										, userLoginBegins: false
									})
	}

	usernameChanged=event => this.setState({username: event.target.value})
	passwordChanged=event => this.setState({password: event.target.value})

	login=() => {
		let {username, password}=this.state
		let valid               =false
		if ((username && password) && (username !== "") && (password !== "")) {
			UserActions.login(username, password)
		} else {
			if (!username || username === "") {
				this.setState({usernameError: "Username is required."})
			}
			if (!password || password === "") {
				this.setState({passwordError: "Password is required."})
			}
		}
	}

	render () {
		let {username, password, error, usernameError, passwordError}=this.state
		const id                                                     ="loginPage"
		return (
			<div id = "loginPage" class = "login" >
				<PageHeader id = "login" >
					<h1 >Login</h1 >
				</PageHeader >
				{error && <Alert id = {id} context = {'danger'} >
					{error}
				</Alert >}
				<TextFormGroup label = "Username"
											 placeholder = "bob@email.com"
											 id = "username"
											 onChange = {this.usernameChanged}
											 required = {true}
											 valid = {usernameError === null}
											 validationMessage = {usernameError}
											 value = {username} />
				<PasswordFormGroup label = "Password" id = "password" valid = {passwordError === null}
													 validationMessage = {passwordError}
													 onChange = {this.passwordChanged} required = {true} value = {password} />
				<button type = "button" class = "btn btn-primary" id = "loginButton" onClick = {this.login} >Login
				</button >
				<button type = "button" class = "btn btn-default" id = "cancelButton" >Cancel</button >
			</div >
		)
	}
}
