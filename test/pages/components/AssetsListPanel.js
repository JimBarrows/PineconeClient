/**
 * Created by JimBarrows on 8/20/16.
 */
'use strict';

import ListPanel from "./ListPanel";

export default class AssetsListPanel extends ListPanel {

	constructor() {
		super("assets");
	}

	addButton() {
		return browser.element("#assetsAddButton");
	}

	editButton() {
		return browser.element("#assetsTable > tbody > tr > td:nth-child(5) > div > button.btn.btn-default.btn-xs");
	}

	deleteButton() {
		return browser.element("#assetsTable > tbody > tr > td:nth-child(5) > div > button.btn.btn-danger.btn-xs");
	}

	newName() {
		return browser.element("#name");
	}

	newSize() {
		return browser.element("#size");
	}

	newType() {
		return browser.element("#type");
	}

	newUrl() {
		return browser.element("#url");
	}

	numberOfRows() {
		return this.rows().value.length;
	}

	row(index) {
		return browser.element("#assetsTable > tbody > tr:nth-child(" + index + ")");
	}

	rows() {
		return browser.elements("#assetsTable > tbody > tr");
	}

	saveNewRow() {
		browser.element("#assetsTable > tbody > tr:nth-child(1) > td:nth-child(5) > div > button").click();
		var panel = this;
		browser.waitUntil(function () {
			return panel.rows().value.length > 0
		}, 2000);
	}

	table() {
		return browser.element("#assetsTable")
	}

	tbody() {
		return browser.element("#assetsTable > tbody");
	}
}