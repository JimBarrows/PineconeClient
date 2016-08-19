'use strict';
import React from "react";
import WordPressDestinationRow from "./WordPressDestinationRow";
import StripedTable from "bootstrap-react-components";


export default class WordPressDestinationList extends React.Component {

	onChange(index, event) {
		this.props.onRowChange(index, event);
	}

	render() {
		let {list, deleteDestination} = this.props;
		let rows                      = list.map((destination, index) =>
				<WordPressDestinationRow key={index}
				                         destination={destination}
				                         onChange={this.onChange.bind(this, index)}
				                         deleteDestination={deleteDestination}/>
		);
		return (
				<StripedTable>
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
				</StripedTable>
		);
	}
}