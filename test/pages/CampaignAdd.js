/**
 * Created by JimBarrows on 8/24/16.
 */
'use strict';

import Page from "./page";

class CampaignAdd extends Page {

	effectiveFrom() {
		return browser.element("#effectiveFormGroup > div > div:nth-child(1) > div > input");
	}

	effectiveThru() {
		return browser.element("#effectiveFormGroup > div > div:nth-child(2) > div > input");
	}

	isCurrent() {

		return browser.getText('.page-header h1') === 'Define Campaign'
	}

	name() {
		return browser.element("#name");
	}

	open() {
		super.open('#/campaign');
	}

	saveButton() {
		return browser.element("#saveCampaignButton");
	}

	submitForm() {
		return browser.submit("#campaignForm");
	}
}

export default new CampaignAdd();