'use strict';
import React from "react";
import ContentRow from "./ContentRow";
import {StripedTable} from "bootstrap-react-components";

export default class ContentList extends React.Component {

	render() {
		let {content}   = this.props;
		let contentRows = content.map((piece, index) => <ContentRow key={piece._id || index} content={piece}/>);
		return (
				<StripedTable>
					<thead>
					<tr>
						<th>Name</th>
						<th>Publish Date</th>
						<th>Channel</th>
					</tr>
					</thead>
					<tbody>
					{contentRows}
					</tbody>
				</StripedTable>
		);
	}
}