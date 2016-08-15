'use strict';
import React from "react";
import DatePicker from "react-datetime";
import Alert from "bootstrap-react-components/src/DangerAlert";


require('react-datetime/css/react-datetime.css');


export default class DateRangeFormGroup extends React.Component {

	render() {
		let {label, name, onChange, error, fromValue, thruValue} = this.props;
		let fromName                                             = name + "From";
		let thruName                                             = name + "Thru";
		let validationStatus                                     = "";
		if (error) {
			validationStatus = "has-error";
		}
		return (
				<div class={"form-group " + validationStatus}>
					<label class="control-label" for={fromName}>{label} From</label>
					<DatePicker id={fromName} value={fromValue} onChange={onChange}/>
					<label class="control-label" for={thruName}>Thru</label>
					<DatePicker id={thruName} value={thruValue} onChange={onChange}/>
					<Alert error={error}/>
				</div>
		);
	}
}