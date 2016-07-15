'use strict';
import React from "react";

export default class WordPressDestinationRow extends React.Component {

	deleteDestination() {
		this.props.deleteDestination(this.props.destination);
	}
	render() {
		let {onChange, destination, deleteDestination} = this.props;
		let {name, url, username, password} = destination;

		return (
				<tr>
					<td><input name="name" type="text" value={name} onChange={onChange}/></td>
					<td><input name="url" type="text" value={url} onChange={onChange}/></td>
					<td><input name="username" type="text" value={username} onChange={onChange}/></td>
					<td><input name="password" type="text" value={password} onChange={onChange}/></td>
					<td>
						<button type="button" class="btn btn-danger btn-xs" onClick={this.deleteDestination.bind(this)}><span
								class="glyphicon glyphicon-remove"/>
						</button>
					</td>
				</tr>
		);
	}
}