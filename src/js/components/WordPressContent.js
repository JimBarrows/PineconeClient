'use strict';
import React from "react";
import {CheckboxFormGroup, TextAreaFormGroup, TextFormGroup, Panel} from "bootstrap-react-components";


export default class WordpressContent extends React.Component {


	render() {
		let {excerpt, status, format, useBody, count, typeToCount, excerptError, statusError, formatError} = this.props.wordpress;

		return (
				<Panel id="wordpress" title="Word Press">
					<CheckboxFormGroup id="wordpressUseBody"
					                   label="Use content  body"
					                   onChange={this.props.onChange}
					                   value={useBody}
					                   error=""/>
					Use the first <input id="wordpressCount" type="number" defaultValue={count}
					                     onChange={this.props.onChange}/> <select id="wordpressTypeToCount"

					                                                              value={typeToCount}
					                                                              onChange={this.props.onChange}>
					<option value="characters">Characters</option>
					<option value="words">Words</option>
					<option value="sentences">Sentences</option>
				</select> of the body for the excerpt.
					<TextAreaFormGroup id="wordpressExcerpt" label="Excerpt"
					                   onChange={this.props.onChange} value={excerpt} error={excerptError} disabled={useBody}/>
					<TextFormGroup id="wordpressStatus" label="Status" placeholder="publish"
					               onChange={this.props.onChange} value={status} error={statusError}/>
					<TextFormGroup id="wordpressFormat" label="Format"
					               onChange={this.props.onChange} value={format} error={formatError}/>
				</Panel>
		);
	}
}