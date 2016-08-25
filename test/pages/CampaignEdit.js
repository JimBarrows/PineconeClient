/**
 * Created by JimBarrows on 8/24/16.
 */
'use strict';

import CampaignForm from "./CampaignForm";

class CampaignEdit extends CampaignForm {

	isCurrent() {

		return browser.getText('.page-header h1') === 'Edit Campaign'
	}

	open(id) {
		super.open('#/campaign/' + id);
	}

}

export default new CampaignEdit();