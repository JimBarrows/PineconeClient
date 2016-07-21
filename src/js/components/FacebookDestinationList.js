'use strict';
import React from "react";
import FacebookDestinationRow from "./FacebookDestinationRow";

export default class FacebookDestinationList extends React.Component {

	render() {
		let list = this.props.list;
		let rows = list.map((item, index) => <FacebookDestinationRow index={index} name={item.name} pageId={pageId}/>);
		return (
				<table class="table table-striped">
					<thead>
					<tr>
						<th>Name</th>
						<th>Page Id</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</table>
		);
	}
}