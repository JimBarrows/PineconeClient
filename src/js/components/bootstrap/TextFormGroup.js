'use strict';
import React from "react";
import FormGroup from "./FormGroup2";

export default class TextFormGroup extends React.Component {

	render() {
		let {label, name, onChange, error, value, placeholder, disabled} = this.props;
		return (
				<FormGroup label={label} name={name} error={error}>
					<input type="text" class="form-control" id={name} placeholder={placeholder} onChange={onChange}
					       value={value} disabled={disabled}/>
				</FormGroup>
		);
	}
}