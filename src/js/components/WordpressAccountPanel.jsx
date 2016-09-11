'use strict';
import React from "react";
import {ListTablePanel} from "bootstrap-react-components";
import WordpressAccountRow from "./WordpressAccountRow";

export default class WordpressAccountPanel extends React.Component {

	add() {
		this.props.itemList.push({
			name: "",
			username: "",
			password: "",
			url: ""
		});
		this.setState({});
	}

	render() {
		let {deleteItem, saveItem, itemList} = this.props;
		let rows                             = itemList.map((item, index) =>
				<WordpressAccountRow deleteItem={deleteItem}
				                     index={index}
				                     key={index}
				                     item={item}
				                     saveItem={saveItem}
				/>
		);
		return (
				<ListTablePanel id="wordpressAccounts" title="Wordpress Accounts" onAddClick={this.add.bind(this)}>
					<thead>
					<tr>
						<th>Name</th>
						<th>URL</th>
						<th>Username</th>
						<th>Password</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</ListTablePanel>
		);
	}
}