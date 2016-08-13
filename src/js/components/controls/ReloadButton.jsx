'use strict';
import React from "react";

export default class ReloadButton extends React.Component {

	render() {
		let {id, onClick} = this.props;
		return (
				<button id={id} type="button" class="btn btn-default btn-xs" onClick={onClick}>
											<span
													class="glyphicon glyphicon-refresh"/>
				</button>
		);
	}
}