'use strict';

import {EditableCell} from "bootstrap-react-components";
import React from "react";
import RowControlButtons from "../components/controls/RowControlButtons";

export default class AssetTableRow extends React.Component {

	constructor(props) {
		super(props);
		let {_id}  = props.asset;
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
				this.props.asset.name = event.target.value;
				break;
			case "type":
				this.props.asset.type = event.target.value;
				break;
			case "size":
				this.props.asset.size = event.target.value;
				break;
			case "url":
				this.props.asset.url = event.target.value;
				break;
		}
	}

	render() {
		let {editing}                           = this.state;
		let {name, type, size, url}             = this.props.asset;

		return (
				<tr>
					<EditableCell id="name" type="text" value={name} onChange={this.onChange.bind(this)} edit={editing}/>
					<EditableCell id="type" type="text" value={type} onChange={this.onChange.bind(this)} edit={editing}/>
					<EditableCell id="size" type="number" value={size} onChange={this.onChange.bind(this)} edit={editing}/>
					<EditableCell id="url" type="url" value={url} onChange={this.onChange.bind(this)} edit={editing}/>
					<td>
						<RowControlButtons editing={editing} edit={this.edit.bind(this)} save={this.save.bind(this)}
						                   remove={this.remove.bind(this)}/>
					</td>
				</tr>
		);
	}

	remove() {
		this.props.deleteAsset(this.props.asset)
	}

	save() {
		this.props.saveAsset(this.props.asset);
		this.setState({
			editing: false
		});
	}
}