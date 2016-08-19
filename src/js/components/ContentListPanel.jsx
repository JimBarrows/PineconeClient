'use strict';
import React from "react";
import ListTablePanel from "bootstrap-react-components";
import RowControlButtons from "../components/controls/RowControlButtons";


export default class ContentListPanel extends React.Component {
	add() {

	}

	reload() {

	}

	edit() {

	}

	save() {

	}

	remove() {

	}

	render() {
		return (
				<ListTablePanel name="content" title="Content" onAddClick={this.add.bind(this)}
				                onReloadClick={this.reload.bind(this)}>
						<thead>
						<tr>
							<th>Title</th>
							<th>Publish Date</th>
							<th>Channels</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>1,000 ways to make money onn Facebook</td>
							<td>12/1/2016</td>
							<td>Twitter, Linked In</td>
							<td><RowControlButtons editing={false} edit={this.edit.bind(this)} save={this.save.bind(this)}
							                       remove={this.remove.bind(this)}/></td>
						</tr>
						</tbody>
				</ListTablePanel>
		);
	}
}