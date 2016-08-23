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
			let expectedData = browser.addAssetTestData(6);
			browser.refresh();
			Settings.open();
			expect(Settings.assetsListPanel.numberOfRows()).to.be.equal(expectedData.assets.length);
		});

		it("must allow an asset to be added", function () {
			Settings.open();
			Settings.assetsListPanel.addButton().click();
			expect(Settings.assetsListPanel.numberOfRows()).to.be.equal(1);
			Settings.assetsListPanel.newName().setValue("New Asset Name");
			Settings.assetsListPanel.newType().setValue("New Asset Type");
			Settings.assetsListPanel.newSize().setValue("100");
			Settings.assetsListPanel.newUrl().setValue("http://localhost:8080/");
			Settings.assetsListPanel.saveNewRow();
			const account = browser.accountInfo();
			expect(account.assets).to.exist;
			expect(account.assets.length).to.be.equal(1);
			expect(account.assets[0].name).to.be.equal("New Asset Name");
		});

		it("must allow an asset to be modified", function () {
			let expectedData = browser.addAssetTestData(1);
			browser.refresh();
			Settings.open();
			expect(Settings.assetsListPanel.numberOfRows()).to.be.equal(1);
			Settings.assetsListPanel.editButton().click();
			Settings.assetsListPanel.newName().setValue("New Asset Name");
			Settings.assetsListPanel.newType().setValue("New Asset Type");
			Settings.assetsListPanel.newSize().setValue("100");
			Settings.assetsListPanel.newUrl().setValue("http://localhost:8080/");
			Settings.assetsListPanel.saveNewRow();
			const account = browser.accountInfo();
			expect(account.assets).to.exist;
			expect(account.assets.length).to.be.equal(1);
			expect(account.assets[0].name).to.be.equal("New Asset Name");
		});

		it("must allow an asset to be deleted", function () {
			let expectedData = browser.addAssetTestData(1);
			browser.refresh();
			Settings.open();
			expect(Settings.assetsListPanel.numberOfRows()).to.be.equal(1);
			Settings.assetsListPanel.deleteButton().click();
			browser.waitUntil(function () {
				return Settings.assetsListPanel.numberOfRows() === 0
			}, 2000, "Row was never deleted.");
			expect(Settings.assetsListPanel.numberOfRows()).to.be.equal(0);
			const account = browser.accountInfo();
			expect(account.assets).to.exist;
			expect(account.assets.length).to.be.equal(0);
		})
	});
});
