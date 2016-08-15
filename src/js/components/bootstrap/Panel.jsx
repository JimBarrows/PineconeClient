'use strict';
import React from "react";

export default class Panel extends React.Component {

	render() {
		return (
				<div class="panel panel-default">
					{this.props.children}
				</div>
		);
	}
}