import React from "react";
import Alert from "./Alert";
import DatePicker from "react-datetime";
require('react-datetime/css/react-datetime.css');
export default class FormGroup extends React.Component {

	constructor() {
		super();
	}

	render() {
		let {label, type, placeholder, name, onChange, error, value, options} = this.props;
		let validationStatus = "";
		if (error) {
			validationStatus = "has-error";
		}
		let input = (<input type={type} class="form-control" id={name} placeholder={placeholder} onChange={onChange}
		                    value={value}/>);
		switch (type) {
			case 'textarea' :
				input = (<textarea class="form-control" id={name} onChange={onChange} value={value}/> );
				break;
			case 'date' :
				input = (<DatePicker id={name} value={value} onChange={onChange}/>);
				break;
			case 'select':
				input = (<select id={name} value={value} class="form-control" onChange={onChange}>
					<option value="-1"></option>
					{options.map(o => <option key={o.value}
					                          value={o.value}>{o.label}</option>)} </select>)
		}
		return (
				<div class={"form-group " + validationStatus}>
					<label class="control-label" for={name}>{label}</label>
					{input}
					<Alert error={error}/>
				</div>
		);
	}
}