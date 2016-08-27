'use strict';
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
		console.log("this.props.budget: ", this.props.budget);
		let actualQuantityTd    = editing ?
				<td><input id="actualQuantity" type="number" defaultValue={actualQuantity} onChange={this.onChange.bind(this)}/>
				</td> :
				<td>{actualQuantity}</td>;
		let actualTotalTd       = <td>{actualQuantity * actualUnitCost}</td>;
		let actualUnitCostTd    = editing ?
				<td><input id="actualUnitCost" type="number" defaultValue={actualUnitCost} onChange={this.onChange.bind(this)}/>
				</td> :
				<td>{actualUnitCost}</td>;
		let estimatedQuantityTd = editing ?
				<td><input id="estimatedQuantity" type="number" defaultValue={estimatedQuantity}
				           onChange={this.onChange.bind(this)}/></td> :
				<td>{estimatedQuantity}</td>;
		let estimatedTotalTd    = <td>{estimatedUnitCost * estimatedQuantity}</td>;
		let estimatedUnitCostTd = editing ?
				<td><input id="estimatedUnitCost" type="number" defaultValue={estimatedUnitCost}
				           onChange={this.onChange.bind(this)}/></td> :
				<td>{estimatedUnitCost}</td>;
		let nameTd              = editing ?
				<td><input id="name" type="text" defaultValue={name} onChange={this.onChange.bind(this)}/></td> :
				<td>{name}</td>;


		return (
				<tr>
					{nameTd}
					{estimatedUnitCostTd}
					{estimatedQuantityTd}
					{estimatedTotalTd}
					{actualUnitCostTd}
					{actualQuantityTd}
					{actualTotalTd}
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