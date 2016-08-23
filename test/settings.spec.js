/**
 * Created by JimBarrows on 8/20/16.
 */
'use strict';


import Settings from "./pages/Settings";
import {user} from "./support/fixtures";

describe("How a user managers account settings", function () {

	beforeEach(() => {
		browser.createAccount();
		browser.url('/#/login');
		browser.waitUntil(function () {
			return browser.getText('.page-header h1') === 'Login'
		}, 2000, 'Didn\'t change to login page');
		browser.element('#username').setValue(user.username);
		browser.element("#password").setValue(user.password);
		browser.click("#loginButton");
		browser.waitUntil(function () {
			return browser.getText('.page-header h1') === 'Campaigns'
		}, 2000, "Didnt change to campaign page");
	});

	describe("How a user manages their assets", function () {

		it("must allow the account assets to displayed", function () {
			let expectedData = browser.addAccountTestData(6);
			browser.refresh();
			Settings.open();
			expect(Settings.assetsListPanel.numberOfRows()).to.be.equal(expectedData.assets.length);
		});

		it("must allow an asset to be added", function () {
			Settings.open();
			Settings.assetsListPanel.addButton().click();
			expect(Settings.assetsListPanel.numberOfRows()).to.be.equal(1);
		})
	});
});
