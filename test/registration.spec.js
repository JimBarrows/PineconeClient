/**
 * Created by JimBarrows on 7/13/16.
 */
'use strict';
import chai from "chai";
import {user} from "./support/fixtures";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

const expect   = chai.expect;
const register = new Register();
const settings = new Settings();

describe("How a user registers for the  application", function () {

	beforeEach(() => {
		register.open();
	});

	it("should allow registration with valid username and password", function () {
		register.username().setValue(user.username);
		register.password().setValue(user.password);
		register.confirmPassword().setValue(user.password);
		register.register();
		browser.waitUntil(settings.isCurrent, 9000, 'Didn\'t change to register page', 1000);
		expect(settings.isCurrent()).to.be.true;
	});

	it("should error when an invalid username, and valid password is used", function () {
		register.username().setValue("this should fail");
		register.confirmPassword().setValue(user.password);
		register.register();
		expect(register.usernameDangerAlert().getText()).to.be.equal("Username is invalid");
	});

	it("should error when an valid username, and 6 character long password is used", function (done) {
		register.username().setValue(user.username);
		let shortPassword = user.password.substr(0, 5);
		register.password().setValue(shortPassword);
		register.confirmPassword().setValue(shortPassword);
		register.register();
		expect(register.passwordDangerAlert().getText()).to.be.equal('Password must be at least 8 characters.');
	});

	it("should error when an valid username, and passwords don't match", function () {
		register.username().setValue(user.username);
		register.password().setValue(user.password);
		register.confirmPassword().setValue(user.password + " different for difference sake");
		register.register();
		expect(register.registerDangerAlert().getText()).to.be.equal('Passwords do not match.');
	});
});