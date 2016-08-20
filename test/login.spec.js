/**
 * Created by JimBarrows on 7/13/16.
 */
'use strict';
import chai from "chai";
import {user} from "./support/fixtures";
import Login from "./pages/Login";
import Campaigns from "./pages/Campaigns";
import "./support/customCommands";

const expect    = chai.expect;
const login     = new Login();
const campaigns = new Campaigns();

describe("The login page", function () {

	beforeEach(() => {
		browser.createAccount();
		login.open();
	});

	it("should allow login with valid username and password", function () {
		login.username().setValue(user.username);
		login.password().setValue(user.password);
		login.login();
		browser.waitUntil(campaigns.isCurrent, 9000, 'Didn\'t change to register page', 1000);
		expect(campaigns.isCurrent()).to.be.true;
	});

	it("should error when an invalid username, and valid password is used", function (done) {
		login.username().setValue(user.username + "this should fail");
		login.password().setValue(user.password);
		login.login();
		browser.waitUntil(login.isCurrent, 9000, 'Didn\'t change to register page', 1000);
		expect(login.loginDangerAlert().getText()).to.be.equal("Unauthorized");
	});

	it("should error when an valid username, and invalid password is used", function (done) {
		login.username().setValue(user.username);
		login.password().setValue(user.password + "this should fail");
		login.login();
		browser.waitUntil(login.isCurrent, 9000, 'Didn\'t change to register page', 1000);
		expect(login.loginDangerAlert().getText()).to.be.equal("Unauthorized");
	});

	it("should error when an invalid username, and invalid password is used", function (done) {
		login.username().setValue(user.username + "this should fail");
		login.password().setValue(user.password + "this should fail");
		login.login();
		browser.waitUntil(login.isCurrent, 9000, 'Didn\'t change to register page', 1000);
		expect(login.loginDangerAlert().getText()).to.be.equal("Unauthorized");
	});

});