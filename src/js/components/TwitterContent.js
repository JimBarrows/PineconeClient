'use strict';
import React from "react";
import FormGroup from "./bootstrap/FormGroup";
import Panel from "./bootstrap/Panel";
import CheckboxFormGroup from "./bootstrap/CheckboxFormGroup";

export default class TwitterPanel extends React.Component {


	render() {
		let {status, useTitle, statusError} = this.props.twitter;
		return (
				<Panel title="Twitter">
					<CheckboxFormGroup name="twitterUseTitle" label="Use content  title" onChange={this.props.onChange}
					                   value={useTitle} error=""/>
					<FormGroup name="twitterStatus" label="Status" type="text" placeholder="Status"
					           onChange={this.props.onChange} value={status} error={statusError}/>
				</Panel>
		);
	}
}