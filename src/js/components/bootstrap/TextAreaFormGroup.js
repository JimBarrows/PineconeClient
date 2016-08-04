'use strict';
import React from "react";
import FormGroup from "./FormGroup2";


export default class TextAreaFormGroup extends React.Component {

	render() {
		let {label, name, onChange, error, value, disabled} = this.props;
		return (
				<FormGroup label={label} name={name} error={error}>
					<textarea class="form-control" id={name} onChange={onChange} value={value} disabled={disabled}/>
				</FormGroup>
		);
	}
}