'use strict';
import AssetTableRow from "./AssetTableRow";
import React from "react";
import {ListTablePanel} from "bootstrap-react-components";

export default class AssetListPanel extends React.Component {

	add() {
		this.props.assets.push({
			name: "",
			type: "",
			size: 0,
			url: ""
		});
		this.setState({})
	}

	render() {
		let {assets} = this.props;
		let rows     = assets.map((asset, index) => <AssetTableRow asset={asset}
		                                                           deleteAsset={this.props.deleteAsset}
		                                                           index={index}
		                                                           key={index}
		                                                           saveAsset={this.props.saveAsset}/>);

		return (
				<ListTablePanel id="assets" title="Assets" onAddClick={this.add.bind(this)}>
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