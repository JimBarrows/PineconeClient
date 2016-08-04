'use strict';
import React from "react";
import FormGroup from "./FormGroup2";
import DatePicker from "react-datetime";


export default class DatePickerForm extends React.Component {

	render() {
		let {label, name, onChange, error, value} = this.props;
		return (
				<FormGroup label={label} name={name} error={error}>
					<DatePicker id={name} value={value} onChange={onChange}/>
				</FormGroup>
		);
	}
}