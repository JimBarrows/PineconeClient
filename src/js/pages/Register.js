import {Alert, PageHeader, PasswordFormGroup, TextFormGroup} from "bootstrap-react-components"
import React                                                 from "react"
import * as UserActions                                      from "../actions/AccountActions"
import {UserEventNames}                                      from "../constants"
import UserStore                                             from "../stores/UserStore"

export default class Register extends React.Component {

	constructor (props) {
		super(props)
		this.state={
			username             : ""
			, password           : ""
			, confirmPassword    : ""
			, passwordMatchError : null
			, passwordError      : null
			, usernameError      : null
			, registerUserSuccess: false
			, error              : null
			, registrationBegins : false
		}

		this.registerFailure=this.registerFailure.bind(this)
	}

	componentDidMount () {
		UserStore.on(UserEventNames.REGISTER_USER_FAILURE, this.registerFailure)
	}

	componentWillUnmount () {
		UserStore.removeListener(UserEventNames.REGISTER_USER_FAILURE, this.registerFailure)
	}

	registerFailure (reason) {
		this.setState({
										registerUserSuccess : false
										, registrationBegins: false
										, error             : reason
									})
	}

	usernameChanged       =event => this.setState({username: event.target.value})
	passwordChanged       =event => this.setState({password: event.target.value})
	confirmPasswordChanged=event => this.setState({confirmPassword: event.target.value})

	register=() => {
		let {username, password, confirmPassword}=this.state
		let valid                                =true
		let re                                   =/^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/
		if (re.test(username)) {
			this.setState({
											usernameError: null
										})
		} else {
			this.setState({
											usernameError: "Username is invalid"
										})
			valid=false
		}
		if (password.length < 8) {
			this.setState({passwordError: "Password must be at least 8 characters."})
			valid=false
		} else if (password !== confirmPassword) {
			this.setState({
											passwordMatchError: "Passwords do not match."
										})
			valid=false
		}
		if (valid) {
			UserActions.registerUser(username, password)
		}
	}

	render () {
		let {confirmPassword, password, passwordError, passwordMatchError, passwordConfirmError, username, usernameError, error}=this.state
		let alertError                                                                                                          =passwordMatchError || (error && error.data)
		const id                                                                                                                ="register"
		return (
			<div class = "register" >
				<PageHeader id = {id} >
					<h1 >Register</h1 >
				</PageHeader >
				{alertError && <Alert id = {id} context = {'danger'} >
					{alertError}
				</Alert >}
				<TextFormGroup label = "Username" placeholder = "bob@email.com" id = "username"
											 onChange = {this.usernameChanged} required = {true} valid = {usernameError === null}
											 validationMessage = {usernameError} value = {username} />
				<PasswordFormGroup label = "Password" id = "password" valid = {passwordError !== null}
													 validationMessage = {passwordError}
													 onChange = {this.passwordChanged} required = {true} value = {password} />
				<PasswordFormGroup label = "Confirm Password" id = "confirmPassword" required = {true}
													 onChange = {this.confirmPasswordChanged} validationMessage = {passwordConfirmError}
													 value = {confirmPassword} />

				<button id = "registerButton" type = "button" class = "btn btn-default" onClick = {this.register} >
					Register
				</button >
				<button type = "button" class = "btn btn-default" >Cancel</button >
			</div >
		)
	}
}
