'use strict';
import React from "react";

export default class Panel extends React.Component {

	render() {
		let {title}= this.props;
		return (
				<div class="panel panel-default">
					<div class="panel-heading clearfix">
						<div class="panel-title pull-left">{title}</div>
					</div>
					<div class="panel-body">
						{this.props.children}
					</div>
				</div>
		)
	}
}