'use strict';
import DestinationTableRow from "./DestinationTableRow";
import React from "react";
import {ListTablePanel} from "bootstrap-react-components";


export default class DestinationsListPanel extends React.Component {

	add() {
		this.props.destinations.push({
			name: "",
			type: "",
			url: ""
		});
		this.setState({});
	}

	render() {
		let {destinations} = this.props;
		let rows           = destinations.map((destination, index) => <DestinationTableRow destination={destination}
		                                                                                   deleteDestination={this.props.deleteDestination}
		                                                                                   index={index}
		                                                                                   key={index}
		                                                                                   saveDestination={this.props.saveDestination}/>);

		return (
				<ListTablePanel name="destinations" title="Destinations" onAddClick={this.add.bind(this)}>
					<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>URL</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</ListTablePanel>
		);
	}
}