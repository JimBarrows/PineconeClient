'use strict';
import {PanelStripedTable, TableHead} from "bootstrap-react-components"
import React                          from "react"
import MessageTableRow                from "./MessageTableRow"


export default class MessagesListPanel extends React.Component {

	add() {
		this.props.messages.push({
			name: "",
			description: ""
		});
		this.setState({});
	}

	render() {
		let {messages} = this.props;
		let rows       = messages.map((message, index) => <MessageTableRow deleteMessage={this.props.deleteMessage}
		                                                                   index={index}
		                                                                   key={index}
		                                                                   message={message}
		                                                                   saveMessage={this.props.saveMessage}/>);

		return (
			<PanelStripedTable id = "messages" title = "Messages" onAddClick = {this.add.bind(this)} >
				<TableHead >
					<tr>
						<th>Name</th>
						<th>Description</th>
					</tr>
				</TableHead >
					<tbody>
					{rows}
					</tbody>
			</PanelStripedTable >
		);
	}
}
