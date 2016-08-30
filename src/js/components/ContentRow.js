'use strict';
import * as Actions from "../actions/ContentActions";
import CampaignListStore from "../stores/CampaignListStore";
import {Link} from "react-router";
import React from "react";
import {ButtonGroup} from "bootstrap-react-components";

export default class ContentRow extends React.Component {

	deleteRow() {
		Actions.remove(this.props.content);
	}

	render() {
		let {_id, title, campaign, publishDate} = this.props.content;
		let campaignName                        = CampaignListStore.findById(campaign).name;
		return (
				<tr>
					<td>{title}</td>
					<td>{publishDate}</td>
					<td>{campaignName}</td>
					<td>
						<ButtonGroup>
							<Link to={{pathname: '/contentEdit', query: {contentId: _id}}} class="btn btn-default btn-xs"><span
									class="glyphicon glyphicon-pencil"
									aria-hidden="true"></span></Link>
							<button type="button" class="btn btn-danger btn-xs" onClick={this.deleteRow.bind(this)}><span
									class="glyphicon glyphicon-remove"></span></button>
						</ButtonGroup>
					</td>
				</tr>
		);
	}
}