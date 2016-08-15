'use strict';
import React from "react";
import {withRouter} from "react-router";
import PageHeader from "bootstrap-react-components/src/PageHeader";
import RowControlButtons from "../components/controls/RowControlButtons";
import ListTablePanel from "../components/bootstrap/ListTablePanel";

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
					<PageHeader title="Campaigns"/>
					<ListTablePanel title="Current Campaigns" onReloadClick={this.reload.bind(this)}
					                onAddClick={this.add.bind(this)}>
						<table class="table table-striped">
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
						</table>
					</ListTablePanel>
				</div>
		);
	}
});