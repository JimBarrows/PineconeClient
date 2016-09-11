'use strict';
import {EditableCell} from "bootstrap-react-components";
import React from "react";
import RowControlButtons from "../components/controls/RowControlButtons";


export default class BudgetTableRow extends React.Component {

	constructor(props) {
		super(props);
		let {_id}  = props.budget;
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
				this.props.budget.name = event.target.value;
				break;
			case "estimatedUnitCost":
				this.props.budget.estimatedUnitCost = event.target.value;
				break;
			case "estimatedQuantity":
				this.props.budget.estimatedQuantity = event.target.value;
				break;
			case "actualQuantity":
				this.props.budget.actualQuantity = event.target.value;
				break;
			case "actualUnitCost":
				this.props.budget.actualUnitCost = event.target.value;
				break;
		}
		this.setState({});
	}

	render() {
		let {editing}                                                                    = this.state;
		let {actualQuantity, actualUnitCost, estimatedQuantity, estimatedUnitCost, name} = this.props.budget;

		return (
				<tr>
					<EditableCell id="name" type="text" value={name} onChange={this.onChange.bind(this)} edit={editing}/>
					<EditableCell id="estimatedUnitCost" type="number" value={estimatedUnitCost}
					              onChange={this.onChange.bind(this)} edit={editing}/>
					<EditableCell id="estimatedQuantity" type="number" value={estimatedQuantity}
					              onChange={this.onChange.bind(this)} edit={editing}/>
					<td>{estimatedUnitCost * estimatedQuantity}</td>
					<EditableCell id="actualUnitCost" type="number" value={actualUnitCost} onChange={this.onChange.bind(this)}
					              edit={editing}/>
					<EditableCell id="actualQuantity" type="number" value={actualQuantity} onChange={this.onChange.bind(this)}
					              edit={editing}/>
					<td>{actualQuantity * actualUnitCost}</td>
					<td>
						<RowControlButtons editing={editing} edit={this.edit.bind(this)} save={this.save.bind(this)}
						                   remove={this.remove.bind(this)}/>
					</td>
				</tr>
		);
	}

	remove() {
		this.props.deleteBudget(this.props.budget)
	}

	save() {
		this.props.saveBudget(this.props.budget);
		this.setState({
			editing: false
		});
	}
}