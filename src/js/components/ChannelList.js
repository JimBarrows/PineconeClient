'use strict';
import React from "react";
import ChannelRow from "../components/ChannelRow";

export default class ChannelList extends React.Component {

	constructor() {
		super();

		this.state = {
			fetching: false
		};
	}

	render() {
		let channels           = this.props.channels;
		const ChannelComponent = channels.map(channel => {
			return <ChannelRow key={channel._id} channel={channel}/>
		});
		return (
				<table class="table table-striped">
					<thead>
					<tr>
						<th>Name</th>
					</tr>
					</thead>
					<tbody>{ChannelComponent}</tbody>
				</table>
		);
	}
}