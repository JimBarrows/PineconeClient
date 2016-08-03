'use strict';
import React from "react";
import TextAreaFormGroup from "./bootstrap/TextAreaFormGroup";
import Panel from "./bootstrap/Panel";
import CheckboxFormGroup from "./bootstrap/CheckboxFormGroup";


export default class FacebookPanel extends React.Component {

	constructor(props) {
		super(props);
		let {post, useBody} = this.props.facebook;
		let {postError} = this.props;
		this.state = {
			post, useBody, postError
		}
	}

	onChange(event) {
		console.log("FacebookPanel: ", event);
	}

	render() {
		let {post, useBody, postError}  = this.state;
		return (
				<Panel title="Facebook">
					<CheckboxFormGroup name="facebookUseBody" label="Use content  body" onChange={this.onChange.bind(this)}
					                   value={useBody} error=""/>
					<TextAreaFormGroup name="facebookPost" label="Post"
					                   onChange={this.onChange.bind(this)} value={post} error={postError}/>
				</Panel>
		);
	}
}