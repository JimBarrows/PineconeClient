'use strict';
import AssetTableRow from "./AssetTableRow";
import React from "react";
import {ListTablePanel} from "bootstrap-react-components";

export default class AssetListPanel extends React.Component {

	constructor(props) {
		super(props);
		console.log("assets: ", this.props.assets);
		this.state = {
			assets: this.props.assets
		}
	}

	add() {
		this.state.assets.push({
			name: "",
			type: "",
			size: 0,
			url: ""
		});
		this.setState({
			assets: this.state.assets
		})
	}

	render() {
		let {assets} = this.state;
		let rows     = assets.map((asset, index) =>
				<AssetTableRow key={index}
				               asset={asset}
				               index={index}/>);

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