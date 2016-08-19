/**
 * Created by JimBarrows on 8/19/16.
 */
'use strict';

import Page from "./page";

export default class Register extends Page {

	constructor() {
		super();
	}

	open() {
		super.open('#/register');
		console.log("Waiting");
		browser.waitUntil(function () {
			return browser.getText('.page-header h1') === 'Register'
		}, 15000, 'Didn\'t change to register page', 1000);
	}

	username() {
		return browser.element('#username');
	}

	password() {
		return browser.element("#password");
	}

	confirmPassword() {
		return browser.element("#confirmPassword");
	}

	register() {
		browser.click("#registerButton");
	}
}