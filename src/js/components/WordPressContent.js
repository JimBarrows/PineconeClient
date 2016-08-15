'use strict';
import React from "react";
import TextAreaFormGroup from "bootstrap-react-components/src/TextAreaFormGroup";
import Panel from "bootstrap-react-components/src/Panel";
import CheckboxFormGroup from "bootstrap-react-components/src/CheckboxFormGroup";
import TextFormGroup from "bootstrap-react-components/src/TextFormGroup";


export default class WordpressContent extends React.Component {


	render() {
		let {excerpt, status, format, useBody, count, typeToCount, excerptError, statusError, formatError} = this.props.wordpress;

		return (
				<Panel title="Word Press">
					<CheckboxFormGroup name="wordpressUseBody"
					                   label="Use content  body"
					                   onChange={this.props.onChange}
					                   value={useBody}
					                   error=""/>
					Use the first <input id="wordpressCount" name="wordpressCount" type="number" defaultValue={count}
					                     onChange={this.props.onChange}/> <select id="wordpressTypeToCount"
					                                                              name="wordpressTypeToCount"
					                                                              value={typeToCount}
					                                                              onChange={this.props.onChange}>
					<option value="characters">Characters</option>
					<option value="words">Words</option>
					<option value="sentences">Sentences</option>
				</select> of the body for the excerpt.
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