'use strict';
import React from "react";

export default class EditableListPanel extends React.Component {

	_add(newItem) {
		this.props.add(newItem);
	}

	render() {
		let {id, list, title} = this.props;
		return (
				<ListTablePanel id={id} title={title} onAddClick={this.add.bind(this)}>
					<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Size</th>
						<th>Location</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</ListTablePanel>
		);
	}
}