import React from "react";
import {Link} from "react-router";
import * as ChannelActions from "../actions/ChannelAction";

export default class ChannelRow extends React.Component {
	constructor(props) {
		super();
		this.state = {
			channel: props.channel
		}
	}

	deleteRow() {
		ChannelActions.deleteChannel(this.state.channel);
	}

	render() {
		let {_id, name, wordPressDestinations} = this.state.channel;

		return (
				<tr>
					<td>{name}</td>
					<td>
						<Link to={{pathname: '/channelEdit', query: {channelId: _id}}} class="btn btn-default btn-xs"><span
								class="glyphicon glyphicon-pencil"
								aria-hidden="true"></span></Link>
						<button type="button" class="btn btn-danger btn-xs" onClick={this.deleteRow.bind(this)}><span
								class="glyphicon glyphicon-remove"></span></button>
					</td>
				</tr>
		);
	}
}