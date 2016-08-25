/**
 * Created by JimBarrows on 8/23/16.
 */
'use strict';

import Campaigns from "./pages/Campaigns";
import CampaignAdd from "./pages/CampaignAdd";
import moment from "moment";
import {user} from "./support/fixtures";


describe("How a user can manage the basic data for a campaign.", function () {

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

	describe("How to create a campaign", function () {

		it("must create a campaign when a name, effective from date are provided.", function () {
			expect(Campaigns.isCurrent()).to.be.true;
			Campaigns.addButton().click();
			browser.waitUntil(function () {
				return CampaignAdd.isCurrent()
			}, 2000);
			let entryFormat         = "MM/DD/YYYY";
			let now                 = moment();
			let thirtyDays          = now.clone().add(30, 'days');
			let nowFormatted        = now.format(entryFormat);
			let thirtyDaysFormatted = thirtyDays.format(entryFormat);
			CampaignAdd.name().setValue("Test Campaign");
			CampaignAdd.effectiveFrom().setValue(nowFormatted);
			CampaignAdd.effectiveThru().setValue(thirtyDaysFormatted);
			CampaignAdd.effectiveFrom().click();
			CampaignAdd.effectiveThru().click();
			CampaignAdd.saveButton().click();
			browser.waitUntil(function () {
				return Campaigns.isCurrent()
			}, 2000);
			let displayFormat = "MMMM Do YYYY";
			expect(Campaigns.cell(1, 1).getText()).to.be.equal("Test Campaign");
			expect(Campaigns.cell(1, 2).getText()).to.be.equal(now.format(displayFormat));
			expect(Campaigns.cell(1, 3).getText()).to.be.equal(thirtyDays.format(displayFormat));
		})


	});
	describe("How to update a campaign", function () {
	});
	describe("How to delete a campaign", function () {
	})
});