/**
 * Created by JimBarrows on 8/20/16.
 */
'use strict';

import Page from "./page";

class Login extends Page {

	isCurrent() {

		return browser.getText('.page-header h1') === 'Login'
	}

	open() {
		super.open('#/login');
	}

	username() {
		return browser.element('#username');
	}

	usernameDangerAlert() {
		return browser.element("#usernameDangerAlert");
	}

	password() {
		return browser.element("#password");
	}

	passwordDangerAlert() {
		return browser.element('#passwordDangerAlert');
	}

	login() {
		browser.click("#loginButton");
	}

	loginDangerAlert() {
		return browser.element('#loginDangerAlert');
	}
}

const login = new Login();
export default login;