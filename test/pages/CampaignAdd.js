/**
 * Created by JimBarrows on 8/24/16.
 */
'use strict';

import CampaignForm from "./CampaignForm";

class CampaignAdd extends CampaignForm {


	isCurrent() {

		return browser.getText('.page-header h1') === 'Define Campaign'
	}

	open() {
		super.open('#/campaign');
	}

}

export default new CampaignAdd();