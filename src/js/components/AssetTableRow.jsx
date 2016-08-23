'use strict';
import {saveAsset, deleteAsset} from "../actions/AccountActions";
import React from "react";
import RowControlButtons from "../components/controls/RowControlButtons";


export default class AssetTableRow extends React.Component {

	constructor(props) {
		super(props);
		let {_id, name, type, size, url} = props.asset;
		console.log("asset table row: ", props.asset);
		let {index}                      = props;
		this.state                       = {
			_id, index, name, size, type, url,
			editing: !_id
		};
	}

	onChange(event) {
		switch (event.target.id) {
			case "name":
				this.setState({
					name: event.target.value
				});
				break;
			case "type":
				this.setState({
					type: event.target.value
				});
				break;
			case "size":
				this.setState({
					size: event.target.value
				});
				break;
			case "url":
				this.setState({
					url: event.target.value
				});
				break;
		}
	}

	edit() {
		this.setState({
			edit: true
		})
	}

	save() {
		saveAsset({
			_id: this._id,
			name: this.state.name,
			type: this.state.type,
			size: this.state.size,
			url: this.state.url
		});
		this.setState({
			editing: false
		});
	}

	remove() {
		deleteAsset({_id: this.state._id})
	}

	render() {
		let {editing, _id, index, name, type, size, url} = this.state;

		let nameTd = editing ?
				<td><input id="name" type="text" defaultValue={name} onChange={this.onChange.bind(this)}/></td> :
				<td>{name}</td>;
		let typeTd = editing ?
				<td><input id="type" type="text" defaultValue={type} onChange={this.onChange.bind(this)}/></td> :
				<td>{type}</td>;
		let sizeTd = editing ?
				<td><input id="size" type="number" defaultValue={size} onChange={this.onChange.bind(this)}/></td> :
				<td>{size}</td>;
		let urlTd  = editing ?
				<td><input id="url" type="url" defaultValue={url} onChange={this.onChange.bind(this)}/></td> :
				<td>{url}</td>;
		return (
				<tr>
					{nameTd}
					{typeTd}
					{sizeTd}
					{urlTd}
					<td>
						<RowControlButtons editing={editing} edit={this.edit.bind(this)} save={this.save.bind(this)}
						                   remove={this.remove.bind(this)}/>
					</td>
				</tr>
		);
	}
}