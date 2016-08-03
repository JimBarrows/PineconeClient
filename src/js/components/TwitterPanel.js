'use strict';
import React from "react";
import FormGroup from "./bootstrap/FormGroup";
import Panel from "./bootstrap/Panel";
import CheckboxFormGroup from "./bootstrap/CheckboxFormGroup";

export default class TwitterPanel extends React.Component {

	constructor(props) {
		super(props);
		let {status, useTitle} = this.props.twitter;
		let {statusError} = this.props;
		this.state = {
			status, useTitle, statusError
		}
	}

	onChange(event) {
		console.log("TwitterPanel: ", event);
	}

	render() {
		let {status, useTitle, statusError} = this.state;
		return (
				<Panel title="Twitter">
					<CheckboxFormGroup name="twitterUseTitle" label="Use content  title" onChange={this.onChange.bind(this)}
					                   value={useTitle} error=""/>
					<FormGroup name="twitterStatus" label="Status" type="text" placeholder="Status"
					           onChange={this.onChange.bind(this)} value={status} error={statusError}/>
				</Panel>
		);
	}
}