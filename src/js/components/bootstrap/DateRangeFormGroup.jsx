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
					<div class="row">
						<div class="col-md-6">
							<label class="control-label" for={fromName}>{label} From</label>
							<DatePicker id={fromName} name={fromName} value={fromValue} onChange={onChange}/>
						</div>
						<div class="col-md-6">
							<label class="control-label" for={thruName}>Thru</label>
							<DatePicker id={thruName} name={thruName} value={thruValue} onChange={onChange}/>
						</div>
					</div>
					<Alert error={error}/>
				</div>
		);
	}
}