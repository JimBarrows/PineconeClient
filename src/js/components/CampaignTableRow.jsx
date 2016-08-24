'use strict';
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
		console.log("remove");
	}

	render() {
		let {campaign} = this.props;
		let {editing}  = this.state;
		return (
				<tr>
					<td>{campaign.name}</td>
					<td>{campaign.effectiveFrom.format("MMMM Do YYYY, h:mm:ss a")}</td>
					<td>{campaign.effectiveThru.format("MMMM Do YYYY, h:mm:ss a")}</td>
					<td>
						<RowControlButtons editing={editing} edit={this.edit.bind(this)} remove={this.remove.bind(this)}/>
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