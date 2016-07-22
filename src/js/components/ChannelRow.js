import React from "react";
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

	editRow() {
		ChannelActions.editChannel(this.state.channel);
	}

	render() {
		let {name} = this.state.channel;

		return (
				<tr>
					<td>{name}</td>
					<td>
						<button type="button" class="btn btn-default btn-xs" onClick={this.editRow.bind(this)}>
							<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
						</button>
						<button type="button" class="btn btn-danger btn-xs" onClick={this.deleteRow.bind(this)}>
							<span class="glyphicon glyphicon-remove"></span>
						</button>
					</td>
				</tr>
		);
	}
}