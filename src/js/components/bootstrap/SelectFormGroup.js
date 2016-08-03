'use strict';
import React from "react";
import FormGroup from "./FormGroup2";


export default class DatePickerForm extends React.Component {

	render() {
		let {label, name, onChange, error, value, options} = this.props;
		return (
				<FormGroup label={label} name={name} error={error}>
					<select id={name} value={value} class="form-control" onChange={onChange}>
						<option value="-1"></option>
						{options.map(o => <option key={o.value}
						                          value={o.value}>{o.label}</option>)} </select>
				</FormGroup>
		);
	}
}