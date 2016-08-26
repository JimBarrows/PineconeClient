'use strict';
import KeywordTableRow from "./KeywordTableRow";
import React from "react";
import {ListTablePanel} from "bootstrap-react-components";

export default class KeywordsListPanel extends React.Component {

	add() {
		this.props.keywords.push({
			name: ""
		});
		this.setState({});
	}

	render() {
		let {keywords} = this.props;
		let rows       = keywords.map((keyword, index) => <KeywordTableRow keyword={keyword}
		                                                                   deleteKeyword={this.props.deleteKeyword}
		                                                                   index={index}
		                                                                   key={index}
		                                                                   saveKeyword={this.props.saveKeyword}/>);

		return (
				<ListTablePanel name="keywords" title="Keywords" onAddClick={this.add.bind(this)}>
					<thead>
					<tr>
						<th>Name</th>
					</tr>
					</thead>
					<tbody>
					{rows}
					</tbody>
				</ListTablePanel>
		);
	}
}
