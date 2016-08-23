'use strict';
import {CampaignEvent} from "../constants";
import CampaignStore from "../stores/CampaignStore";
import {withRouter} from "react-router";
import {ListTablePanel, PageHeader} from "bootstrap-react-components";
import React from "react";
import RowControlButtons from "../components/controls/RowControlButtons";

export default withRouter(class Campaigns extends React.Component {

	add() {
		this.props.router.push('/campaignEdit');
	}

	edit() {
		console.log("edit clicked");
	}

	constructor(props) {
		super(props);
		this.updateCampaignList = this.updateCampaignList.bind(this);
		this.state              = {
			campaigns: []
		}
	}

	componentWillMount() {
		CampaignStore.on(CampaignEvent.CREATE_SUCCESS, this.updateCampaignList);
	}

	componentWillMount() {
		CampaignStore.removeListener(CampaignEvent.CREATE_SUCCESS, this.updateCampaignList);
	}

	remove() {
		console.log("remove clicked");
	}
	render() {
		let campaignRows = this.state.campaigns.map((campaign, index) => {
			<tr key={campaign._id || index}>
				<td>campaign.name</td>
				<td>campaign.effectiveFrom</td>
				<td>effective.effectiveThru</td>
				<td>
					<RowControlButtons editing={false} edit={this.edit.bind(this)} remove={this.remove.bind(this)}/>
				</td>
			</tr>
		});
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
		this.setState({
			campaigns: CampaignStore.campaigns()
		});
	}
});

