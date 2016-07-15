'use strict';
import React from "react";
import WordPressDestinationRow from "./WordPressDestinationRow";
export default class WordPressDestinationList extends React.Component {

	onChange(index, event) {
		this.props.onRowChange(index, event);
	}

	render() {
		let count = 0;
		let {list, deleteDestination} = this.props;
		let rows  = list.map((destination) =>
				<WordPressDestinationRow key={count++} destination={destination} onChange={this.onChange.bind(this, count)}
				                         deleteDestination={deleteDestination}/>
		);
		return (
				<div>
					<table class="table table-striped">
						<thead>
						<tr>
							<th>Name</th>
							<th>URL</th>
							<th>Username</th>
							<th>Password</th>
						</tr>
						</thead>
						<tbody>
						{rows}
						</tbody>
					</table>
				</div>
		);
	}
}