/**
 * Created by JimBarrows on 7/13/16.
 */
'use strict';
import chai from "chai";
import {cleanDatabase} from "./support/fixtures";

const expect = chai.expect();

describe("How a user registers for the  application", function () {

	var browser;

	before(()=> {
		var options = {desiredCapabilities: {browserName: 'chrome'}};
		browser     = webdriverio.remote(options)
				.init()
				.url('http://localhost:8080');
	});

	beforeEach((done) => {
		cleanDatabase()
				.then(()=>browser.url('http://localhost:8080'))
				.then(() => browser.click('#registerLink'))
				.then((client) => done())
				.catch((error) => console.log("Error beforeEach: ", error));
	});

	afterAll((done)=> {
		browser
				.endAll()
				.then(()=> done())
				.catch((error) => console.log("error closing browser: ", error));

	});

	describe("Using a username and password", function () {
		it("should allow registration with valid username and password", function (done) {
			browser.getText(".page-header h1")
					.then((text) => expect(text).toBe("Register"))
					.then(() => browser.setValue("#username", username))
					.then(() => browser.setValue("#password", password))
					.then(() => browser.setValue("#confirmPassword", password))
					.then(() => browser.click("#registerButton"))
					.then(() => browser.waitForExist("#channelPanel", 3000))
					.then(() => browser.getText(".page-header h1"))
					.then((text) => expect(text).toBe("Channels"))
					.then(() => done())
					.catch((err) => console.log("Valid username and password test failed: ", err));
		}, 15000);

		it("should error when an invalid username, and valid password is used", function (done) {
			browser.getText(".page-header h1")
					.then((text) => expect(text).toBe("Register"))
					.then(() => browser.setValue("#username", username + "this should fail"))
					.then(() => browser.setValue("#password", password))
					.then(() => browser.setValue("#confirmPassword", password))
					.then(() => browser.click("#registerButton"))
					.then(() => browser.waitForExist(".alert.alert-danger", 3000))
					.then(() => browser.getText(".page-header h1", 3000))
					.then((text) => expect(text).toBe("Register"))
					.then(() => done())
					.catch((err) => console.log("Invalid username, valid password test failed: ", err));
		}, 15000);

		it("should error when an valid username, and 6 character long password is used", function (done) {
			browser.getText(".page-header h1")
					.then((text) => expect(text).toBe("Register"))
					.then(() => browser.setValue("#username", username))
					.then(() => browser.setValue("#password", password.substr(0, 5)))
					.then(() => browser.setValue("#confirmPassword", password.substr(0, 5)))
					.then(() => browser.click("#registerButton"))
					.then(() => browser.waitForExist(".alert.alert-danger", 3000))
					.then(() => browser.getText(".page-header h1", 3000))
					.then((text) => expect(text).toBe("Register"))
					.then(()=> browser.getText('.alert.alert-danger'))
					.then((text) => expect(text).toBe('Password must be at least 8 characters.'))
					.then(() => done())
					.catch((err) => console.log("Valid username, invalid password test failed ", err));
		}, 15000);

		it("should error when an valid username, and passwords don't match", function (done) {
			browser.getText(".page-header h1")
					.then((text) => expect(text).toBe("Register"))
					.then(() => browser.setValue("#username", username))
					.then(() => browser.setValue("#password", password))
					.then(() => browser.setValue("#confirmPassword", password + "this should fail"))
					.then(() => browser.click("#registerButton"))
					.then(() => browser.getText(".page-header h1", 3000))
					.then((text) => expect(text).toBe("Register"))
					.then(()=> browser.getText('.alert.alert-danger'))
					.then((text) => expect(text).toBe('Passwords do not match.'))
					.then(() => done())
					.catch((err) => console.log("Invalid username, invalid password test failed: ", err));
		}, 15000);
	});
});