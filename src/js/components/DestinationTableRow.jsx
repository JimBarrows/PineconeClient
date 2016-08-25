'use strict';
import React from "react";
import RowControlButtons from "../components/controls/RowControlButtons";

export default class DestinationTableRow extends React.Component {

	constructor(props) {
		super(props);
		let {_id}  = props.destination;
		this.state = {
			editing: !_id
		};
	}

	onChange(event) {
		switch (event.target.id) {
			case "name":
				this.props.destination.name = event.target.value;
				break;
			case "type":
				this.props.destination.type = event.target.value;
				break;
			case "url":
				this.props.destination.url = event.target.value;
				break;
		}
	}

	edit() {
		this.setState({
			editing: true
		})
	}

	save() {
		this.props.saveDestination(this.props.destination);
		this.setState({
			editing: false
		});
	}

	remove() {
		this.props.deleteDestination(this.props.destination)
	}

	render() {
		let {editing}                           = this.state;
		let {name, type, url}                   = this.props.destination;

		let nameTd = editing ?
				<td><input id="name" type="text" defaultValue={name} onChange={this.onChange.bind(this)}/></td> :
				<td>{name}</td>;
		let typeTd = editing ?
				<td><input id="type" type="text" defaultValue={type} onChange={this.onChange.bind(this)}/></td> :
				<td>{type}</td>;
		let urlTd  = editing ?
				<td><input id="url" type="url" defaultValue={url} onChange={this.onChange.bind(this)}/></td> :
				<td>{url}</td>;
		return (
				<tr>
					{nameTd}
					{typeTd}
					{urlTd}
					<td>
						<RowControlButtons editing={editing} edit={this.edit.bind(this)} save={this.save.bind(this)}
						                   remove={this.remove.bind(this)}/>
					</td>
				</tr>
		);
	}
}