/**
 * Created by JimBarrows on 8/20/16.
 */
'use strict';

import Page from "./page";

class Campaigns extends Page {

	addButton() {
		return browser.element("#currentCampaignsAddButton");
	}

	cell(row, column) {
		let selector = "#currentCampaignsTable > tbody > tr:nth-child(" + row + ") > td:nth-child(" + column + ")";
		return browser.element(selector);
	}

	editButton(row) {
		return browser.element("#currentCampaignsTable > tbody > tr:nth-child(" + row + ") > td:nth-child(4) > div > button.btn.btn-default.btn-xs");
	}

	deleteButton(row) {
		return browser.element("#currentCampaignsTable > tbody > tr:nth-child(" + row + ") > td:nth-child(4) > div > button.btn.btn-danger.btn-xs");
	}

	isCurrent() {

		return browser.getText('.page-header h1') === 'Campaigns'
	}

	numberOfRows() {
		if (!browser.element("#currentCampaignsTable > tbody > tr").value) {
			return 0;
		} else if (Array.isArray(browser.element("#currentCampaignsTable > tbody > tr").value)) {
			return browser.element("#currentCampaignsTable > tbody > tr").value.length;
		} else {
			return 1;
		}

	}

	open() {
		super.open('#/');
	}


	row(index) {
		element("#currentCampaignsTable > tbody > tr:nth-child(" + index + ")");
	}

}

export default new Campaigns();