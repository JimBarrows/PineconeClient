/**
 * Created by JimBarrows on 8/24/16.
 */
'use strict';

import Page from "./page";

class CampaignAdd extends Page {

	isCurrent() {

		return browser.getText('.page-header h1') === 'Modify Campaign'
	}

	open() {
		super.open('#/campaign');
	}

}

export default new CampaignAdd();