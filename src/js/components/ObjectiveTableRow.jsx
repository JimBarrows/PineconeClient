'use strict';
import {EditableCell} from "bootstrap-react-components";
import React from "react";
import RowControlButtons from "../components/controls/RowControlButtons";

export default class ObjectiveTableRow extends React.Component {

	constructor(props) {
		super(props);
		let {_id}  = props.objective;
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
			case "description":
				this.props.objective.description = event.target.value;
				break;
			case "met":
				this.props.objective.met = event.target.value;
				break;
			case "name":
				this.props.objective.name = event.target.value;
				break;
		}
	}

	render() {
		let {editing}                                                     = this.state;
		let {description, met, name}                                      = this.props.objective;

		let metTd         = editing ?
				<td><input id="met" type="checkbox" defaultValue={met} onChange={this.onChange.bind(this)}/></td> :
				<td>{met ? <span class="glyphicon glyphicon-ok"/> : <span class="glyphicon glyphicon-remove"/>}</td>;

		return (
				<tr>
					<EditableCell id="name" type="text" value={name} onChange={this.onChange.bind(this)} edit={editing}/>
					<EditableCell id="description" type="text" value={description} onChange={this.onChange.bind(this)}
					              edit={editing}/>
					{metTd}
					<td>
						<RowControlButtons editing={editing} edit={this.edit.bind(this)} save={this.save.bind(this)}
						                   remove={this.remove.bind(this)}/>
					</td>
				</tr>
		);
	}

	remove() {
		this.props.deleteObjective(this.props.objective)
	}

	save() {
		this.props.saveObjective(this.props.objective);
		this.setState({
			editing: false
		});
	}
}