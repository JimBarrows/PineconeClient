'use strict';
import React from "react";

export default class AddButton extends React.Component {

	render() {
		const {id, onClick} = this.props;
		return (
				<button id={id} onClick={onClick} class="btn btn-success btn-xs">
					<span class="glyphicon glyphicon-plus"/>
				</button>
		);
	}
}