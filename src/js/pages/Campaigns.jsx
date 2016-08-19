'use strict';
import React from "react";
import {withRouter} from "react-router";
import {ListTablePanel, PageHeader} from "bootstrap-react-components";
import RowControlButtons from "../components/controls/RowControlButtons";

export default withRouter(class Campaigns extends React.Component {

	edit() {

	}

	remove() {

	}

	add() {
		this.props.router.push('/campaignEdit');
	}

	reload() {

	}

	render() {
		return (
				<div>
					<PageHeader>
						<h1>Campaigns</h1>
					</PageHeader>
					<ListTablePanel name="currentCampaigns" title="Current Campaigns" onReloadClick={this.reload.bind(this)}
					                onAddClick={this.add.bind(this)}>
							<thead>
							<tr>
								<th>Name</th>
								<th>Start Date</th>
								<th>End Date</th>
								<th>Objectives Met</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>Campaign 1</td>
								<td>10/1/2016</td>
								<td>10/31/2016</td>
								<td>yes</td>
								<td>
									<RowControlButtons editing={false} edit={this.edit.bind(this)} remove={this.remove.bind(this)}/>
								</td>
							</tr>
							</tbody>
					</ListTablePanel>
				</div>
		);
	}
});