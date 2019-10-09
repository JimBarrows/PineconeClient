'use strict'
import {PanelStripedTable} from "bootstrap-react-components"
import React               from "react"
import DestinationTableRow from "./DestinationTableRow"


export default class DestinationsListPanel extends React.Component {

	add () {
		this.props.destinations.push({
																	 name: "",
																	 type: "",
																	 url : ""
																 })
		this.setState({})
	}

	render () {
		let {destinations}=this.props
		let rows          =destinations.map((destination, index) => <DestinationTableRow destination = {destination}
																																										 deleteDestination = {this.props.deleteDestination}
																																										 index = {index}
																																										 key = {index}
																																										 saveDestination = {this.props.saveDestination} />)

		return (
			<PanelStripedTable name = "destinations" title = "Destinations" onAddClick = {this.add.bind(this)} >
				<thead >
					<tr >
						<th >Name</th >
						<th >Type</th >
						<th >URL</th >
					</tr >
				</thead >
				<tbody >
					{rows}
				</tbody >
			</PanelStripedTable >
		)
	}
}
