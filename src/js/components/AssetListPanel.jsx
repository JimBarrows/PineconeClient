'use strict';
import React from "react";
import ListTablePanel from "bootstrap-react-components/src/ListTablePanel";
import RowControlButtons from "../components/controls/RowControlButtons";


export default class AssetListPanel extends React.Component {
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
				<ListTablePanel name="assets" title="Assets" onAddClick={this.add.bind(this)}
				                onReloadClick={this.reload.bind(this)}>
						<thead>
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th>Size</th>
							<th>Location</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>Campaign Logo</td>
							<td>PNG</td>
							<td>1,200k</td>
							<td><a href="https://dropbox.com">Dropbox/campaignName/images/campaignLog.png</a></td>
							<td>
								<RowControlButtons editing={false} edit={this.edit.bind(this)} save={this.save.bind(this)}
								                   remove={this.remove.bind(this)}/>
							</td>
						</tr>
						<tr>
							<td>Audio Spot 1</td>
							<td>mp3</td>
							<td>1,200k</td>
							<td><a href="https://dropbox.com">Dropbox/campaignName/audio/spot1.mp3</a></td>
							<td>
								<RowControlButtons editing={false} edit={this.edit.bind(this)} save={this.save.bind(this)}
								                   remove={this.remove.bind(this)}/>
							</td>
						</tr>
						</tbody>
				</ListTablePanel>
		);
	}
}