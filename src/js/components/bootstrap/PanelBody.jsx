'use strict';
import React from "react";

export default class PanelBody extends React.Component {

	render() {
		return (
				<div class="panel-body">
					{this.props.children}
				</div>
		);
	}
}