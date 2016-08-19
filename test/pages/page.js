/**
 * Created by JimBarrows on 8/19/16.
 */
'use strict';

export default class Page {
	constructor() {

	}

	open(path) {
		browser.url('/' + path);
	}
};