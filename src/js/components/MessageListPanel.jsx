'use strict';
import MessageTableRow from "./MessageTableRow";
import React from "react";
import {ListTablePanel} from "bootstrap-react-components";


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
		let rows       = messages.map((message, index) => <MessageTableRow message={message}
		                                                                   deleteMessage={this.props.deleteMessage}
		                                                                   index={index}
		                                                                   key={index}
		                                                                   saveMessage={this.props.saveMessage}/>);

		return (
				<ListTablePanel id="messages" title="Messages" onAddClick={this.add.bind(this)}>
					<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</ListTablePanel>
		);
	}
}