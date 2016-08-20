/**
 * Created by JimBarrows on 8/19/16.
 */
'use strict';

import Page from "./page";

export default class Register extends Page {

	constructor() {
		super();
	}

	isCurrent() {
		return browser.getText('.page-header h1') === 'Register'
	}

	open() {
		super.open('#/register');
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

	confirmPassword() {
		return browser.element("#confirmPassword");
	}

	register() {
		browser.click("#registerButton");
	}

	registerDangerAlert() {
		return browser.element('#registerDangerAlert');
	}
}