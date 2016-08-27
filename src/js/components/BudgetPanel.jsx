'use strict';
import BudgetTableRow from "./BudgetTableRow";
import React from "react";
import {ListTablePanel} from "bootstrap-react-components";


export default class BudgetPanel extends React.Component {
	add() {
		this.props.budgetLineItems.push({
			actualQuantity: 1,
			actualUnitCost: 0.0,
			estimatedQuantity: 1,
			estimatedUnitCost: 0.0,
			name: ""
		});
		this.setState({});
	}

	render() {
		let {budgetLineItems} = this.props;
		let estimatedTotal    = 0.0;
		let actualTotal       = 0.0;
		let rows              = budgetLineItems.map((budget, index) => {
			estimatedTotal += (budget.estimatedQuantity * budget.estimatedUnitCost);
			actualTotal += (budget.actualQuantity * budget.actualUnitCost);
			return <BudgetTableRow budget={budget}
			                       deleteBudget={this.props.deleteBudget}
			                       index={index}
			                       key={index}
			                       saveBudget={this.props.saveBudget}/>
		});
		return (
				<ListTablePanel id="budgetPanel" title="Budget" onAddClick={this.add.bind(this)}>
					<thead>
					<tr>
						<th/>
						<th colSpan="3">Estimated</th>
						<th colSpan="3">Actual</th>
					</tr>
					<tr>
						<th>Item</th>
						<th>Unit Cost</th>
						<th>Quantity</th>
						<th>Total</th>
						<th>Unit Cost</th>
						<th>Quantity</th>
						<th>Total</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					<tr>
						<th colSpan="3">Estimated Total</th>
						<th>{estimatedTotal}</th>
						<th colSpan="2"> Total</th>
						<th>{actualTotal}</th>
					</tr>
					</tbody>
				</ListTablePanel>
		);
	}
}