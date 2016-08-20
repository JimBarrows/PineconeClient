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

	describe("Using a username and password", function () {

		it("should allow registration with valid username and password", function () {
			register.open();
			register.username().setValue(user.username);
			register.password().setValue(user.password);
			register.confirmPassword().setValue(user.password);
			register.register();
			browser.waitUntil(settings.isCurrent, 9000, 'Didn\'t change to register page', 1000);
			expect(settings.isCurrent()).to.be.true;
		});

		it("should error when an invalid username, and valid password is used", function () {
			register.open();
			register.username().setValue("this should fail");
			register.confirmPassword().setValue(user.password);
			register.register();
			expect(register.usernameDangerAlert().getText()).to.be.equal("Username is invalid");
		});
		//
		// it("should error when an valid username, and 6 character long password is used", function (done) {
		// 	browser.getText(".page-header h1")
		// 			.then((text) => expect(text).toBe("Register"))
		// 			.then(() => browser.setValue("#username", username))
		// 			.then(() => browser.setValue("#password", password.substr(0, 5)))
		// 			.then(() => browser.setValue("#confirmPassword", password.substr(0, 5)))
		// 			.then(() => browser.click("#registerButton"))
		// 			.then(() => browser.waitForExist(".alert.alert-danger", 3000))
		// 			.then(() => browser.getText(".page-header h1", 3000))
		// 			.then((text) => expect(text).toBe("Register"))
		// 			.then(()=> browser.getText('.alert.alert-danger'))
		// 			.then((text) => expect(text).toBe('Password must be at least 8 characters.'))
		// 			.then(() => done())
		// 			.catch((err) => console.log("Valid username, invalid password test failed ", err));
		// }, 15000);
		//
		// it("should error when an valid username, and passwords don't match", function (done) {
		// 	browser.getText(".page-header h1")
		// 			.then((text) => expect(text).toBe("Register"))
		// 			.then(() => browser.setValue("#username", username))
		// 			.then(() => browser.setValue("#password", password))
		// 			.then(() => browser.setValue("#confirmPassword", password + "this should fail"))
		// 			.then(() => browser.click("#registerButton"))
		// 			.then(() => browser.getText(".page-header h1", 3000))
		// 			.then((text) => expect(text).toBe("Register"))
		// 			.then(()=> browser.getText('.alert.alert-danger'))
		// 			.then((text) => expect(text).toBe('Passwords do not match.'))
		// 			.then(() => done())
		// 			.catch((err) => console.log("Invalid username, invalid password test failed: ", err));
		// }, 15000);
	});
});