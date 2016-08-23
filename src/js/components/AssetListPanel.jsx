'use strict';
import AssetTableRow from "./AssetTableRow";
import React from "react";
import {ListTablePanel} from "bootstrap-react-components";


export default class AssetListPanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			add: false
		}
	}

	add() {
		this.setState({
			add: true
		})
	}

	reload() {

	}

	edit() {

	}

	save() {
		this.setState({
			add: false
		})
	}

	remove() {

	}

	render() {
		let {assets} = this.props;
		let rows     = assets.map((asset) => (
				<AssetTableRow key={asset._id} asset={asset} edit={this.edit.bind(this)} save={this.save.bind(this)}
				               remove={this.remove.bind(this)}/>  ));

		let addRow = this.state.add ? <tr key={0}>
			<td>Name</td>
			<td>Type</td>
			<td>Size</td>
			<td>URL</td>
			<td>
				<RowControlButtons editing={this.state.add} edit={this.edit.bind(this)} save={this.save.bind(this)}
				                   remove={this.remove.bind(this)}/>
			</td>
		</tr> : null;
		return (
				<ListTablePanel id="assets" title="Assets" onAddClick={this.add.bind(this)}
				                onReloadClick={this.reload.bind(this)}>
					<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Size</th>
						<th>Location</th>
					</tr>
					</thead>
					<tbody>
					{addRow}
					{rows}
					</tbody>
				</ListTablePanel>
		);
	}
}