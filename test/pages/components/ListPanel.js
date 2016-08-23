/**
 * Created by JimBarrows on 8/20/16.
 */
'use strict';

export default class ListPanel {

	constructor(name) {
		this.name = name;
	}

	reload() {
		browser.click('#' + name + 'ReloadButton');
	}

	addd() {
		browser.click('#' + name + 'AddButton');
	}
}