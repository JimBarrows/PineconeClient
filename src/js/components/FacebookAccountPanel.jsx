'use strict';
import {PanelStripedTable, TableHead} from "bootstrap-react-components"
import React                          from "react"
import FacebookAccountRow             from "./FacebookAccountRow"

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
			<PanelStripedTable id = "facebookAccounts" title = "Facebook Accounts" onAddClick = {this.add.bind(this)} >
				<TableHead >
					<tr>
						<th>Name</th>
					</tr>
				</TableHead >
					<tbody>
					{rows}
					</tbody>
			</PanelStripedTable >
		);
	}
}
