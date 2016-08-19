'use strict';
import React from "react";
import ButtonGroup from "bootstrap-react-components";

export default class RowControlButtons extends React.Component {

	render() {
		let {editing, edit, save, remove} = this.props;

		let buttonGroup = editing ? (<ButtonGroup>
			<button type="button" class="btn btn-default btn-xs" onClick={save}>
				<span class="glyphicon glyphicon-ok"/>
			</button>
		</ButtonGroup>) : (<ButtonGroup>
			<button type="button" class="btn btn-default btn-xs" onClick={edit}>
				<span class="glyphicon glyphicon-pencil"/>
			</button>
			<button type="button" class="btn btn-danger btn-xs" onClick={remove}>
				<span class="glyphicon glyphicon-remove"/>
			</button>
		</ButtonGroup>);
		return buttonGroup;
	}
}