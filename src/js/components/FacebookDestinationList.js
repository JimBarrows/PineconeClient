'use strict';
import React from "react";

export default class FacebookDestinationList extends React.Component {

	render() {
		let list = this.props.list;
		console.log("fdl list: ", list);
		let rows = list.map((item, index) => <tr key={index}>
			<td>{item.name}</td>
			<td>{item.email}</td>
			<td>{item.accessToken.substring(0, 30)}</td>
			<td>{item.expiresIn.toString()}</td>
			<td>{item.signedRequest.substring(0, 30)}</td>
			<td>{item.userId}</td>
		</tr>);
		return (
				<table class="table table-striped">
					<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Access Token</th>
						<th>Expires In</th>
						<th>Signed Request</th>
						<th>UserId</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</table>
		);
	}
}