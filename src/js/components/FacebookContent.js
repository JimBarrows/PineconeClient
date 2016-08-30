'use strict';
import React from "react";
import {CheckboxFormGroup, Panel, TextAreaFormGroup} from "bootstrap-react-components";

export default class FacebookContent extends React.Component {

	render() {
		let {post, useBody, postError}  = this.props.facebook;
		return (
				<Panel id="facebook" title="Facebook">
					<CheckboxFormGroup id="facebookUseBody" label="Use content  body" onChange={this.props.onChange}
					                   value={useBody} error=""/>
					<TextAreaFormGroup error={postError}
					                   id="facebookPost"
					                   label="Post"
					                   onChange={this.props.onChange}
					                   value={post}/>
				</Panel>
		);
	}
}