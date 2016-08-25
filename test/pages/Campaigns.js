/**
 * Created by JimBarrows on 8/20/16.
 */
'use strict';

import Page from "./page";

class Campaigns extends Page {

	addButton() {
		return browser.element("#currentCampaignsAddButton");
	}

	isCurrent() {

		return browser.getText('.page-header h1') === 'Campaigns'
	}

	open() {
		super.open('#/');
	}

	row(index) {
		element("#currentCampaignsTable > tbody > tr:nth-child(" + index + ")");
	}

	cell(row, column) {
		let selector = "#currentCampaignsTable > tbody > tr:nth-child(" + row + ") > td:nth-child(" + column + ")";
		return browser.element(selector);
	}

	editButton(row) {
		return browser.element("#currentCampaignsTable > tbody > tr:nth-child(" + row + ") > td:nth-child(4) > div > button.btn.btn-default.btn-xs");
	}
}

export default new Campaigns();