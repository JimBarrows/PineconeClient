'use strict';
import React from "react";
import FormGroup from "bootstrap-react-components/src/FormGroup";


export default class PasswordFormGroup extends React.Component {

	render() {
		let {label, name, onChange, error, value, placeholder, disabled} = this.props;
		return (
				<FormGroup label={label} name={name} error={error}>
					<input type="password" class="form-control" id={name} placeholder={placeholder} onChange={onChange}
					       value={value} disabled={disabled}/>
				</FormGroup>
		);
	}
}