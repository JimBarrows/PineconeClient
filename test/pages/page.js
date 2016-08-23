/**
 * Created by JimBarrows on 8/19/16.
 */
'use strict';

export default class Page {

	open(path) {
		browser.url('/' + path);
		browser.waitUntil(this.isCurrent, 15000, 'Didn\'t change to ' + path, 1000);
	}

	isCurrent() {
		return false;
	}
};