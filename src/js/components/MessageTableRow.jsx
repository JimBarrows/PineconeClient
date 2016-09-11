'use strict';

import {EditableCell} from "bootstrap-react-components";
import React from "react";
import RowControlButtons from "../components/controls/RowControlButtons";

export default class MessageTableRow extends React.Component {

	constructor(props) {
		super(props);
		let {_id}  = props.message;
		this.state = {
			editing: !_id
		};
	}

	edit() {
		this.setState({
			editing: true
		})
	}

	onChange(event) {
		switch (event.target.id) {
			case "name":
				this.props.message.name = event.target.value;
				break;
			case "description":
				this.props.message.description = event.target.value;
				break;
		}
	}

	render() {
		let {editing}                                                = this.state;
		let {name, description}                                      = this.props.message;

		return (
				<tr>
					<EditableCell id="name" type="text" value={name} onChange={this.onChange.bind(this)} edit={editing}/>
					<EditableCell id="description" type="text" value={description} onChange={this.onChange.bind(this)}
					              edit={editing}/>
					<td>
						<RowControlButtons editing={editing} edit={this.edit.bind(this)} save={this.save.bind(this)}
						                   remove={this.remove.bind(this)}/>
					</td>
				</tr>
		);
	}

	remove() {
		this.props.deleteMessage(this.props.message)
	}

	save() {
		this.props.saveMessage(this.props.message);
		this.setState({
			editing: false
		});
	}
}