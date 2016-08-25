/**
 * Created by JimBarrows on 8/23/16.
 */
'use strict';

import Campaigns from "./pages/Campaigns";
import CampaignAdd from "./pages/CampaignAdd";
import CampaignEdit from "./pages/CampaignEdit";
import moment from "moment";
import {user} from "./support/fixtures";
const displayFormat = "MMMM Do YYYY";
const entryFormat   = "MM/DD/YYYY";

describe("How a user can manage the basic data for a campaign.", function () {

	let account = {};

	beforeEach(() => {
		account = browser.createAccount();
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

			expect(Campaigns.cell(1, 1).getText()).to.be.equal("Test Campaign");
			expect(Campaigns.cell(1, 2).getText()).to.be.equal(now.format(displayFormat));
			expect(Campaigns.cell(1, 3).getText()).to.be.equal(thirtyDays.format(displayFormat));
		})


	});
	describe("How to update a campaign", function () {
		it("must update an existing campaigns basic information", function () {
			let now        = moment();
			let thirtyDays = now.clone().add(30, 'days');
			let original   = browser.createCampaign({
				name: "Test Campaign",
				effectiveFrom: now,
				effectiveThru: thirtyDays,
				owner: account._id
			});
			browser.refresh();
			browser.waitUntil(function () {
				return Campaigns.isCurrent()
			}, 2000);
			Campaigns.editButton(1).click();
			browser.waitUntil(function () {
				return CampaignEdit.isCurrent()
			}, 2000);
			expect(CampaignEdit.name().getValue()).to.be.equal(original.name);
			expect(CampaignEdit.effectiveFrom().getValue()).to.be.equal(moment(original.effectiveFrom).format(entryFormat));
			expect(CampaignEdit.effectiveThru().getValue()).to.be.equal(moment(original.effectiveThru).format(entryFormat));
			let later       = now.clone().add(30, 'days');
			let laterThirty = later.clone().add(30, 'days');
			CampaignEdit.name().setValue("Test Campaign updated");
			CampaignEdit.effectiveFrom().setValue(later.format(entryFormat));
			CampaignEdit.effectiveThru().setValue(laterThirty.format(entryFormat));
			CampaignEdit.effectiveFrom().click();
			CampaignEdit.effectiveThru().click();
			CampaignEdit.saveButton().click();
			browser.waitUntil(function () {
				return Campaigns.isCurrent()
			}, 2000);

			expect(Campaigns.cell(1, 1).getText()).to.be.equal("Test Campaign updated");
			expect(Campaigns.cell(1, 2).getText()).to.be.equal(later.format(displayFormat));
			expect(Campaigns.cell(1, 3).getText()).to.be.equal(laterThirty.format(displayFormat));
		})
	});
	describe("How to delete a campaign", function () {
		it("must delete a campaign", function () {
			let now        = moment();
			let thirtyDays = now.clone().add(30, 'days');
			let original   = browser.createCampaign({
				name: "Test Campaign",
				effectiveFrom: now,
				effectiveThru: thirtyDays,
				owner: account._id
			});
			browser.refresh();
			browser.waitUntil(function () {
				return Campaigns.isCurrent()
			}, 2000);
			Campaigns.deleteButton(1).click();
			expect(Campaigns.numberOfRows()).to.be.equal(0);
		});
	});
});