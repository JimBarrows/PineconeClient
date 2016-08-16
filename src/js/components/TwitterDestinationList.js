'use strict';
import React from "react";
import TwitterDestinationRow from "./TwitterDestinationRow";
import StripedTable from "bootstrap-react-components/src/StripedTable";
";
export default class TwitterDestinationList extends React.Component {

	render() {
		let {list} = this.props;
		let rows   = list.map((item, index) =>
				<TwitterDestinationRow key={index}
				                       index={index}
				                       twitterDestination={item}/>);
		return (
				<StripedTable>
					<thead>
					<tr>
						<th>Name</th>
						<th>Owner Name</th>
						<th>Owner Id</th>
						<th>Access Token</th>
						<th>Access Token Secret</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</StripedTable>
		);
	}
}