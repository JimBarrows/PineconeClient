/**
 * Created by JimBarrows on 8/20/16.
 */
'use strict';

import Page from "./page";

class Campaigns extends Page {

	isCurrent() {

		return browser.getText('.page-header h1') === 'Campaigns'
	}

	open() {
		super.open('#/campaigns');
	}

}

export default new Campaigns();