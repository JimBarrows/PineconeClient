'use strict';
import React from "react";

export default class PanelHeader extends React.Component {

	render() {
		return (
				<div class="panel-heading clearfix">
					{this.props.children}
				</div>
		);
	}
}