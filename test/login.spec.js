/**
 * Created by JimBarrows on 7/13/16.
 */
'use strict';
import chai from "chai";
import {user} from "./support/fixtures";
import Login from "./pages/Login";
import Campaigns from "./pages/Campaigns";

const expect    = chai.expect;

describe("The Login page", function () {

	beforeEach(() => {
		browser.createAccount();
		Login.open();
	});

	it("should allow Login with valid username and password", function () {
		Login.username().setValue(user.username);
		Login.password().setValue(user.password);
		Login.login();
		browser.waitUntil(Campaigns.isCurrent, 9000, 'Didn\'t change to register page', 1000);
		expect(Campaigns.isCurrent()).to.be.true;
	});

	it("should error when an invalid username, and valid password is used", function (done) {
		Login.username().setValue(user.username + "this should fail");
		Login.password().setValue(user.password);
		Login.login();
		browser.waitUntil(Login.isCurrent, 9000, 'Didn\'t change to register page', 1000);
		expect(Login.loginDangerAlert().getText()).to.be.equal("Unauthorized");
	});

	it("should error when an valid username, and invalid password is used", function (done) {
		Login.username().setValue(user.username);
		Login.password().setValue(user.password + "this should fail");
		Login.login();
		browser.waitUntil(Login.isCurrent, 9000, 'Didn\'t change to register page', 1000);
		expect(Login.loginDangerAlert().getText()).to.be.equal("Unauthorized");
	});

	it("should error when an invalid username, and invalid password is used", function (done) {
		Login.username().setValue(user.username + "this should fail");
		Login.password().setValue(user.password + "this should fail");
		Login.login();
		browser.waitUntil(Login.isCurrent, 9000, 'Didn\'t change to register page', 1000);
		expect(Login.loginDangerAlert().getText()).to.be.equal("Unauthorized");
	});

});