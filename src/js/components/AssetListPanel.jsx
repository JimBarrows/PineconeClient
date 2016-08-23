'use strict';
import AssetTableRow from "./AssetTableRow";
import React from "react";
import {ListTablePanel} from "bootstrap-react-components";
import {UserEventNames} from "../constants";
import UserStore from "../stores/UserStore";


export default class AssetListPanel extends React.Component {

	constructor(props) {
		super(props);
		this.updateAccounts = this.updateAccounts.bind(this);
		this.state          = {
			assets: this.props.assets
		}
	}

	componentWillMount() {
		UserStore.on(UserEventNames.UPDATE_ACCOUNT, this.updateAccounts);
		UserStore.on(UserEventNames.UPDATE_ACCOUNT_FAILURE, this.updateAccounts);
	}

	componentWillUnmount() {
		UserStore.removeListener(UserEventNames.UPDATE_ACCOUNT, this.updateAccounts);
		UserStore.removeListener(UserEventNames.UPDATE_ACCOUNT_FAILURE, this.updateAccounts);
	}

	updateAccounts() {
		this.setState({
			assets: UserStore.assets()
		});
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