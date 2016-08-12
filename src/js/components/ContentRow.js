'use strict';
import React from "react";
import {Link} from "react-router";
import * as Actions from "../actions/ContentActions";

export default class ContentRow extends React.Component {

	deleteRow() {
		Actions.remove(this.props.content);
	}

	render() {

		let {_id, title, channel, publishDate} = this.props.content;
		let channelName = ChannelStore.findById(channel).name;
		return (
				<tr>
					<td>{title}</td>
					<td>{publishDate}</td>
					<td>{channelName}</td>
					<td>
						<Link to={{pathname: '/contentEdit', query: {contentId: _id}}} class="btn btn-default btn-xs"><span
								class="glyphicon glyphicon-pencil"
								aria-hidden="true"></span></Link>
						<button type="button" class="btn btn-danger btn-xs" onClick={this.deleteRow.bind(this)}><span
								class="glyphicon glyphicon-remove"></span></button>
					</td>
				</tr>
		);
	}
}