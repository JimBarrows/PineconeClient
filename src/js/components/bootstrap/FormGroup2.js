import React from "react";
import Alert from "./Alert";

require('react-datetime/css/react-datetime.css');
export default class FormGroup extends React.Component {

	constructor() {
		super();
	}

	render() {
		let {label, name, error} = this.props;
		let validationStatus = "";
		if (error) {
			validationStatus = "has-error";
		}

		return (
				<div class={"form-group " + validationStatus}>
					<label class="control-label" for={name}>{label}</label>
					{this.props.children}
					<Alert error={error}/>
				</div>
		);
	}
}