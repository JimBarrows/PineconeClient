'use strict';
import React from "react";
import TextAreaFormGroup from "./bootstrap/TextAreaFormGroup";
import Panel from "./bootstrap/Panel";
import CheckboxFormGroup from "./bootstrap/CheckboxFormGroup";


export default class FacebookPanel extends React.Component {

	render() {
		let {post, useBody, postError}  = this.props.facebook;
		console.log("FacebookPanel.render: ", this.props);
		return (
				<Panel title="Facebook">
					<CheckboxFormGroup name="facebookUseBody" label="Use content  body" onChange={this.props.onChange}
					                   value={useBody} error=""/>
					<TextAreaFormGroup name="facebookPost" label="Post"
					                   onChange={this.props.onChange} value={post} error={postError} disabled={useBody}/>
				</Panel>
		);
	}
}