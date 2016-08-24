'use strict';
import * as CampaignActions from "../actions/CampaignActions";
import {CampaignEvent} from "../constants";
import CampaignStore from "../stores/CampaignListStore";
import CampaignTableRow from "../components/CampaignTableRow";
import {withRouter} from "react-router";
import {ListTablePanel, PageHeader} from "bootstrap-react-components";
import React from "react";

export default withRouter(class Campaigns extends React.Component {

	add() {
		this.props.router.push('/campaign');
	}

	constructor(props) {
		super(props);
		this.updateCampaignList = this.updateCampaignList.bind(this);
		this.state              = {
			campaigns: []
		}
	}

	componentDidMount() {
		CampaignActions.load();
	}

	componentWillMount() {
		CampaignStore.on(CampaignEvent.CREATE_SUCCESS, this.updateCampaignList);
		CampaignStore.on(CampaignEvent.LOAD_LIST_SUCCESS, this.updateCampaignList);
	}

	componentWillUnmount() {
		CampaignStore.removeListener(CampaignEvent.CREATE_SUCCESS, this.updateCampaignList);
		CampaignStore.removeListener(CampaignEvent.LOAD_LIST_SUCCESS, this.updateCampaignList);
	}


	render() {
		console.log("Campaigns.render: ", this.state.campaigns);
		let campaignRows = this.state.campaigns.map((campaign, index) =>
				<CampaignTableRow key={index} campaign={campaign}/>);
		return (
				<div>
					<PageHeader id="campaigns">
						<h1>Campaigns</h1>
					</PageHeader>
					<ListTablePanel id="currentCampaigns" title="Current Campaigns"
					                onAddClick={this.add.bind(this)}>
						<thead>
						<tr>
							<th>Name</th>
							<th>Start Date</th>
							<th>End Date</th>
						</tr>
						</thead>
						<tbody>
						{campaignRows}
						</tbody>
					</ListTablePanel>
				</div>
		);
	}

	updateCampaignList() {
		console.log("Campaigns.updateCampaignList: ", CampaignStore.campaigns);
		this.setState({
			campaigns: CampaignStore.campaigns
		});
	}
});

