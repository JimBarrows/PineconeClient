'use strict';
import React from "react";
import FormGroup from "./bootstrap/FormGroup";
import Panel from "./bootstrap/Panel";

export default class WordpressPanel extends React.Component {

	constructor(props) {
		super(props);
		let {excerpt, status, format} = this.props.wordpress;
		let {excerptError, statusError, formatError} = this.props;
		this.state = {
			excerpt, status, format, excerptError, statusError, formatError
		}
	}

	onChange(event) {
		console.log("WordpressPanel: ", event);
	}

	render() {
		let {excerpt, status, format, excerptError, statusError, formatError} = this.state;

		return (
				<Panel title="Word Press">
					<FormGroup name="wpExcerpt" label="Excerpt" type="textarea"
					           onChange={this.onChange.bind(this)} value={excerpt} error={excerptError}/>
					<FormGroup name="wpStatus" label="Status" type="text" placeholder="publish"
					           onChange={this.onChange.bind(this)} value={status} error={statusError}/>
					<FormGroup name="wpFormat" label="Format" type="text"
					           onChange={this.onChange.bind(this)} value={format} error={formatError}/>
				</Panel>
		);
	}
}