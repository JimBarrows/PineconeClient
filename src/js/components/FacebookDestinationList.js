'use strict';
import React from "react";
import FacebookDestinationRow from "./FacebookDestinationRow";

export default class FacebookDestinationList extends React.Component {

	render() {
		let {list} = this.props;
		let rows = list.map((item, index) =>
				<FacebookDestinationRow key={index}
				                        _id={item._id}
				                        index={index}
				                        name={item.name}
				                        pageId={item.pageId}/>);
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