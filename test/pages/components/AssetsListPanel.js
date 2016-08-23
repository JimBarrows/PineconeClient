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
		return this.table().element("tbody");
	}

	rows() {
		return this.tbody().elements("tr");
	}

	numberOfRows() {
		return this.rows().value.length;
	}

	row(index) {
		return this.tbody().element("tr:nth-child(" + index + ")");
	}

	addButton() {
		return browser.element("#assetsAddButton");
	}

	newName() {
		return browser.element("#assetsTable > tbody > tr:nth-child(1) > td:nth-child(1)");
	}

	newType() {
		return browser.element("#assetsTable > tbody > tr:nth-child(1) > td:nth-child(2)");
	}

	newSize() {
		return browser.element("#assetsTable > tbody > tr:nth-child(1) > td:nth-child(3)");
	}

	newSize() {
		return browser.element("#assetsTable > tbody > tr:nth-child(1) > td:nth-child(4)");
	}

	newUrl() {
		return browser.element("#assetsTable > tbody > tr:nth-child(1) > td:nth-child(5)");
	}

	saveNewRow() {
		browser.element('#assetsTable > tbody > tr:nth-child(1) > td:nth-child(5) > div > button').click();
	}
}