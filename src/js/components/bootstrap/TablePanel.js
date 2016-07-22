'use strict';
import React from "react";

export default class TablePanel extends React.Component {

	render() {
		let {title, addRow}= this.props;
		return (
				<div class="panel panel-default">
					<div class="panel-heading clearfix">
						<div class="panel-title pull-left">{title}</div>
						<div class="btn-group pull-right">
							<button type="button" class="btn btn-default btn-xs" onClick={addRow}>
								<span class="glyphicon glyphicon-plus"/></button>
						</div>
					</div>
					<div class="panel-body">
						{this.props.children}
					</div>
				</div>
		);
	}
}