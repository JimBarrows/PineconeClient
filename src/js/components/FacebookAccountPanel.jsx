'use strict';
import React from "react";
import {ListTablePanel} from "bootstrap-react-components";
import FacebookAccountRow from "./FacebookAccountRow";

export default class FacebookAccountPanel extends React.Component {

	add() {
		this.props.itemList.push({
			accessToken: "",
			name: "",
			pageId: ""
		});
		this.setState({});
	}

	render() {
		let {deleteItem, saveItem, itemList} = this.props;
		let rows                             = itemList.map((item, index) =>
				<FacebookAccountRow deleteItem={deleteItem}
				                    index={index}
				                    key={index}
				                    item={item}
				                    saveItem={saveItem}
				/>
		);
		return (
				<ListTablePanel id="facebookAccounts" title="Facebook Accounts" onAddClick={this.add.bind(this)}>
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