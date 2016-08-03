'use strict';
import React from "react";
import Alert from "./Alert";


export default class CheckboxFormGroup extends React.Component {

	render() {
		let {label, placeholder, name, onChange, error, value} = this.props;
		console.log("CheckboxFormGroup.render props: ", this.props);
		let validationStatus = "";
		if (error) {
			validationStatus = "has-error";
		}
		return (
				<div class={"form-group " + validationStatus}>
					<label >
						<input type="checkbox" id={name} name={name} placeholder={placeholder}
						       onChange={onChange}
						       value={name}
						       checked={value}/>
						{label}
					</label>
					<Alert error={error}/>
				</div>
		);
	}
}