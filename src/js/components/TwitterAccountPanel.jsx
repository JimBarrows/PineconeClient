'use strict';
import React from "react";
import {ListTablePanel} from "bootstrap-react-components";
import TwitterAccountRow from "./TwitterAccountRow";

export default class TwitterAccountPanel extends React.Component {

	add() {
		this.props.itemList.push({
			accessToken: "",
			accessTokenSecret: "",
			name: "",
			ownerId: "",
			owner: ""
		});
		this.setState({});
	}

	render() {
		let {deleteItem, saveItem, itemList} = this.props;
		let rows                             = itemList.map((item, index) =>
				<TwitterAccountRow deleteItem={deleteItem}
				                   index={index}
				                   key={index}
				                   item={item}
				                   saveItem={saveItem}
				/>
		);
		return (
				<ListTablePanel id="twitterAccounts" title="Twitter Accounts" onAddClick={this.add.bind(this)}>
					<thead>
					<tr>
						<th>Name</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</ListTablePanel>
		);
	}
}