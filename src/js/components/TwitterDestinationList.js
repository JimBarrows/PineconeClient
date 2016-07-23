'use strict';
import React from "react";
import TwitterDestinationRow from "./TwitterDestinationRow";

export default class TwitterDestinationList extends React.Component {

	render() {
		let {list} = this.props;
		let rows = list.map((item, index) =>
				<TwitterDestinationRow key={index}
				                       index={index}
				                       twitterDestination={item}/>);
		return (
				<table class="table table-striped">
					<thead>
					<tr>
						<th>Name</th>
						<th>Oauth Token</th>
						<th>Oauth Verifier</th>
						<th>Access Token</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</table>
		);
	}
}