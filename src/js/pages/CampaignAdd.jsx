'use strict';
import * as CampaignAction from "../actions/CampaignActions";
import CampaignForm from "../components/CampaignForm";
import CampaignStore from "../stores/CampaignStore";
import {PageHeader} from "bootstrap-react-components";
import React from "react";
import {withRouter} from "react-router";


export default withRouter(class CampaignAdd extends React.Component {

	onSubmit(campaign) {
		CampaignAction.create(campaign);
		this.props.router.push('/');
	}

	render() {
		return (
				<div class="campaign add page">
					<PageHeader>
						<h1>Define Campaign</h1>
					</PageHeader>
					<CampaignForm campaign={CampaignStore.campaign} onSubmit={this.onSubmit.bind(this)}/>
				</div>
		);
	}
})