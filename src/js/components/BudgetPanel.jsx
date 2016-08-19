'use strict';
import React from "react";
import ListTablePanel from "bootstrap-react-components";
import RowControlButtons from "../components/controls/RowControlButtons";


export default class BudgetPanel extends React.Component {
	add() {

	}

	reload() {

	}

	edit() {

	}

	save() {

	}

	remove() {

	}

	render() {
		return (
				<ListTablePanel name="budget" title="Budget" onAddClick={this.add.bind(this)}
				                onReloadClick={this.reload.bind(this)}>
						<thead>
						<tr>
							<th>Item</th>
							<th>Unit Cost</th>
							<th>Quantity</th>
							<th>Amount</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>
								<input type="text" class="form-control" placeholder="Facebook Adds"/>
							</td>
							<td>
								<input type="number" class="form-control" aria-label="Amount (to the nearest dollar)"/>
							</td>
							<td>
								<input type="number" class="form-control"/>
							</td>
							<td>
								<input type="number" class="form-control" aria-label="Amount (to the nearest dollar)"/>
							</td>
							<td>
								<RowControlButtons editing={false} edit={this.edit.bind(this)} save={this.save.bind(this)}
								                   remove={this.remove.bind(this)}/>
							</td>
						</tr>
						</tbody>
				</ListTablePanel>
		);
	}
}