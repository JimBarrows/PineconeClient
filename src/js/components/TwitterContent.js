'use strict';
import React from "react";
import {CheckboxFormGroup, Panel, TextFormGroup} from "bootstrap-react-components";

export default class TwitterContent extends React.Component {


	render() {
		let {status, useTitle, statusError} = this.props.twitter;
		return (
				<Panel id="twitter" title="Twitter">
					<CheckboxFormGroup id="twitterUseTitle" label="Use content  title" onChange={this.props.onChange}
					                   value={useTitle} error=""/>
					<TextFormGroup error={statusError}
					               id="twitterStatus"
					               label="Status"
					               onChange={this.props.onChange}
					               value={status}
					               disabled={useTitle}/>
				</Panel>
		);
	}
}