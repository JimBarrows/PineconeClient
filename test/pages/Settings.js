/**
 * Created by JimBarrows on 8/19/16.
 */
'use strict';

import Page from "./page";

export default class Settings extends Page {

	isCurrent() {

		return browser.getText('.page-header h1') === 'Settings'
	}

	open() {
		super.open('#/settings');
	}
}