'use strict';
import {PanelStripedTable, TableHead} from "bootstrap-react-components"
import React                          from "react"
import KeywordTableRow                from "./KeywordTableRow"

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
			<PanelStripedTable name = "keywords" title = "Keywords" onAddClick = {this.add.bind(this)} >
				<TableHead >
					<tr>
						<th>Name</th>
					</tr>
				</TableHead >
					<tbody>
					{rows}
					</tbody>
			</PanelStripedTable >
		);
	}
}
