'use strict'
import {PanelStripedTable, TableHead} from "bootstrap-react-components"
import React                          from "react"
import AssetTableRow                  from "./AssetTableRow"

export default class AssetListPanel extends React.Component {

	add=() => {
		this.props.assets.push({
														 name: "",
														 type: "",
														 size: 0,
														 url : ""
													 })
		this.setState({})
	}

	render () {
		let {assets}=this.props
		let rows    =assets.map((asset, index) => <AssetTableRow asset = {asset}
																														 deleteAsset = {this.props.deleteAsset}
																														 index = {index}
																														 key = {index}
																														 saveAsset = {this.props.saveAsset} />)

		return (
			<PanelStripedTable id = "assets" title = "Assets" onAddClick = {this.add} >
				<TableHead >
					<tr >
						<th >Name</th >
						<th >Type</th >
						<th >Size</th >
						<th >Location</th >
					</tr >
				</TableHead >
				<tbody >
					{rows}
				</tbody >
			</PanelStripedTable >
		)
	}
}
