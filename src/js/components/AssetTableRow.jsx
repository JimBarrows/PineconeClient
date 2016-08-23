'use strict';
import React from "react";
import RowControlButtons from "../components/controls/RowControlButtons";
export default class AssetTableRow extends React.Component {

	render() {
		let {asset, edit, save, remove} = this.props;
		return (
				<tr>
					<td>{asset.name}</td>
					<td>{asset.type}</td>
					<td>{asset.size}</td>
					<td>{asset.url}</td>
					<td>
						<RowControlButtons editing={false} edit={edit} save={save}
						                   remove={remove}/>
					</td>
				</tr>
		);
	}
}