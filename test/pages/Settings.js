/**
 * Created by JimBarrows on 8/19/16.
 */
'use strict';

import AssetsListPanel from "./components/AssetsListPanel";
import Page from "./page";

class Settings extends Page {

	constructor() {
		super();
		this.assetsListPanel = new AssetsListPanel();
	}


	isCurrent() {
		return browser.getText('.page-header h1') === 'Settings'
	}

	open() {
		super.open('#/settings');
	}
}

export default new Settings();