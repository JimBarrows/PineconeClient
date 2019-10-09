'use strict'
import {PanelStripedTable, TableHead} from "bootstrap-react-components"
import React                          from "react"
import WordpressAccountRow            from "./WordpressAccountRow"

export default class WordpressAccountPanel extends React.Component {

	add () {
		this.props.itemList.push({
															 name    : "",
															 username: "",
															 password: "",
															 url     : ""
														 })
		this.setState({})
	}

	render () {
		let {deleteItem, saveItem, itemList}=this.props
		let rows                            =itemList.map((item, index) =>
																												<WordpressAccountRow deleteItem = {deleteItem}
																																						 index = {index}
																																						 key = {index}
																																						 item = {item}
																																						 saveItem = {saveItem}
																												/>
		)
		return (
			<PanelStripedTable id = "wordpressAccounts" title = "Wordpress Accounts" onAddClick = {this.add.bind(this)} >
				<TableHead >
					<tr >
						<th >Name</th >
						<th >URL</th >
						<th >Username</th >
						<th >Password</th >
					</tr >
				</TableHead >
				<tbody >
					{rows}
				</tbody >
			</PanelStripedTable >
		)
	}
}
