'use strict';
import React from "react";

export default class EditableCell extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			edit: props.edit
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			edit: props.edit
		});
	};

	render() {
		let {id, onChange, type, value}     = this.props;
		let {edit}                          = this.state.edit;
		let input                           = this.state.edit ?
				<input id={id} type={type} defaultValue={value} onChange={onChange}/> :
				<span id={id + "Value"}>{value}</span>;
		return (<td id={id + "Cell"}>{input}</td>);
	}
}