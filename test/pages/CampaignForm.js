/**
 * Created by JimBarrows on 8/25/16.
 */
'use strict';
import Page from "./page";

export default class CampaignForm extends Page {

	effectiveFrom() {
		return browser.element("#effectiveFormGroup > div > div:nth-child(1) > div > input");
	}

	effectiveThru() {
		return browser.element("#effectiveFormGroup > div > div:nth-child(2) > div > input");
	}

	name() {
		return browser.element("#name");
	}

	saveButton() {
		return browser.element("#saveCampaignButton");
	}

	submitForm() {
		return browser.submit("#campaignForm");
	}
}
