'use strict';
import React from "react";
import TextAreaFormGroup from "./bootstrap/TextAreaFormGroup";
import TextFormGroup from "./bootstrap/TextFormGroup";
import CheckboxFormGroup from "./bootstrap/CheckboxFormGroup";
import Panel from "./bootstrap/Panel";

export default class WordpressContent extends React.Component {


	render() {
		let {excerpt, status, format, useBody, count, typeToCount, excerptError, statusError, formatError} = this.props.wordpress;

		console.log("WordpressPanel.render props: ", this.props.wordpress);
		return (
				<Panel title="Word Press">
					<CheckboxFormGroup name="wordpressUseBody"
					                   label="Use content  body"
					                   onChange={this.props.onChange}
					                   value={useBody}
					                   error=""/>
					<TextAreaFormGroup name="wpExcerpt" label="Excerpt"
					                   onChange={this.props.onChange} value={excerpt} error={excerptError} disabled={useBody}/>
					<TextFormGroup name="wpStatus" label="Status" placeholder="publish"
					               onChange={this.props.onChange} value={status} error={statusError}/>
					<TextFormGroup name="wpFormat" label="Format"
					               onChange={this.props.onChange} value={format} error={formatError}/>
				</Panel>
		);
	}
}