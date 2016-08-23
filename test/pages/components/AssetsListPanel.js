/**
 * Created by JimBarrows on 8/20/16.
 */
'use strict';

import ListPanel from "./ListPanel";

export default class AssetsListPanel extends ListPanel {

	constructor() {
		super("assets");
	}

	table() {
		return browser.element("#assetsTable")
	}

	tbody() {
		return browser.element("#assetsTable > tbody");
	}

	rows() {
		return browser.elements("#assetsTable > tbody > tr");
	}

	numberOfRows() {
		return this.rows().value.length;
	}

	row(index) {
		return browser.element("#assetsTable > tbody > tr:nth-child(" + index + ")");
	}

	addButton() {
		return browser.element("#assetsAddButton");
	}

	newName() {
		return browser.element("#name");
	}

	newType() {
		return browser.element("#type");
	}

	newSize() {
		return browser.element("#size");
	}

	newUrl() {
		return browser.element("#url");
	}

	saveNewRow() {
		browser.element("#assetsTable > tbody > tr:nth-child(1) > td:nth-child(5) > div > button").click();
		var panel = this;
		browser.waitUntil(function () {
			return panel.rows().value.length > 0
		}, 2000);
	}
}