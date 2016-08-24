'use strict';

import * as CampaignAction from "../actions/CampaignActions";
import CampaignForm from "../components/CampaignForm";
import {PageHeader} from "bootstrap-react-components";
import React from "react";


export default class CampaignEdit extends React.Component {

	componentDidMount() {
		CampaignAction.findById(this.props.routeParams.campaignId);
	}

	render() {

		return (
				<div class="campaign edit page">
					<PageHeader>
						<h1>Edit Campaign</h1>
					</PageHeader>
					<CampaignForm campaign={campaign}/>
				</div>
		);
	}
};