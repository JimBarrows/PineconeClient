'use strict';
import {EditableCell} from "bootstrap-react-components";
import React from "react";
import RowControlButtons from "../components/controls/RowControlButtons";

export default class WordpressAccountRow extends React.Component {

	constructor(props) {
		super(props);
		let {_id}  = props.item;
		this.state = {
			editing: !_id
		}
	}

	edit() {
		this.setState({
			editing: true
		})
	}

	onChange(event) {
		switch (event.target.id) {
			case "name":
				this.props.item.name = event.target.value;
				break;
			case "password":
				this.props.item.password = event.target.value;
				break;
			case "url":
				this.props.item.url = event.target.value;
				break;
			case "username":
				this.props.item.username = event.target.value;
				break;
		}
	}

	remove() {
		this.props.deleteItem(this.props.item)
	}

	render() {
		let {editing}                           = this.state;
		let {deleteItem, index, item, saveItem} = this.props;
		let {name, password, url, username}     = item;

		return (
				<tr>
					<EditableCell id="name" type="text" value={name} onChange={this.onChange.bind(this)} edit={editing}/>
					<EditableCell id="password" type="text" value={password} onChange={this.onChange.bind(this)} edit={editing}/>
					<EditableCell id="url" type="text" value={url} onChange={this.onChange.bind(this)} edit={editing}/>
					<EditableCell id="username" type="text" value={username} onChange={this.onChange.bind(this)} edit={editing}/>
					<td>
						<RowControlButtons editing={editing}
						                   edit={this.edit.bind(this)}
						                   save={this.save.bind(this)}
						                   remove={this.remove.bind(this)}/>
					</td>
				</tr>
		);
	}

	save() {
		this.props.saveItem(this.props.item);
		this.setState({
			editing: false
		});
	}
}