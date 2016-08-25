'use strict';
import * as CampaignActions from "../actions/CampaignActions";
import React from "react";
import RowControlButtons from "./controls/RowControlButtons";
import {withRouter} from "react-router";


export default withRouter(class CampaignTableRow extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			editing: false
		}
	}

	edit() {
		this.props.router.push('/campaign/' + this.props.campaign._id);
	}

	remove() {
		CampaignActions.remove(this.props.campaign);
	}

	render() {
		let {campaign} = this.props;
		let {editing}  = this.state;
		return (
				<tr>
					<td>{campaign.name}</td>
					<td>{campaign.effectiveFrom.format("MMMM Do YYYY")}</td>
					<td>{campaign.effectiveThru.format("MMMM Do YYYY")}</td>
					<td>
						<RowControlButtons id={campaign._id} editing={editing} edit={this.edit.bind(this)}
						                   remove={this.remove.bind(this)}/>
					</td>
				</tr>
		);
	}

	save() {
		this.setState({
			editing: false
		})
	}
});