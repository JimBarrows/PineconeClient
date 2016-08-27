'use strict';
import ObjectiveTableRow from "./ObjectiveTableRow";
import React from "react";
import {ListTablePanel} from "bootstrap-react-components";


export default class ObjectivesListPanel extends React.Component {

	add() {
		this.props.objectives.push({
			name: "",
			description: "",
			met: false
		});
		this.setState({});
	}

	render() {
		let {objectives} = this.props;
		let rows         = objectives.map((objective, index) => <ObjectiveTableRow objective={objective}
		                                                                           deleteObjective={this.props.deleteObjective}
		                                                                           index={index}
		                                                                           key={index}
		                                                                           saveObjective={this.props.saveObjective}/>);

		return (
				<ListTablePanel id="objectives" title="Objectives" onAddClick={this.add.bind(this)}>
					<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Met</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>

				</ListTablePanel>
		);
	}
}