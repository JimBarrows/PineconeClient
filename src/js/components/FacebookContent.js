'use strict';
import React from "react";
import {CheckboxFormGroup, Panel, TextAreaFormGroup} from "bootstrap-react-components";

export default class FacebookContent extends React.Component {

	render() {
		let {post, useBody, postError}  = this.props.facebook;
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