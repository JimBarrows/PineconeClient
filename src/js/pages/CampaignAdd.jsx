'use strict';
import * as CampaignAction from "../actions/CampaignActions";
import {CampaignEvent} from "../constants";
import CampaignForm from "../components/CampaignForm";
import CampaignStore from "../stores/CampaignStore";
import {PageHeader} from "bootstrap-react-components";
import React from "react";
import {withRouter} from "react-router";


export default withRouter(class CampaignAdd extends React.Component {

	componentDidMount() {
		CampaignAction.clear();
	}

	componentWillMount() {
		CampaignStore.on(CampaignEvent.LOAD_CAMPAIGN_SUCCESS, this.update);
		CampaignStore.on(CampaignEvent.UPDATE_SUCCESS, this.update);
	}

	componentWillUnmount() {
		CampaignStore.removeListener(CampaignEvent.LOAD_CAMPAIGN_SUCCESS, this.update);
		CampaignStore.removeListener(CampaignEvent.UPDATE_SUCCESS, this.update);

	}

	constructor() {
		super();
		this.update = this.update.bind(this);
		this.state  = {
			campaign: CampaignStore.campaign
		}
	}

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
					<CampaignForm campaign={this.state.campaign} onSubmit={this.onSubmit.bind(this)}/>
				</div>
		);
	}

	update() {
		this.setState({
			campaign: CampaignStore.campaign
		})
	}
})