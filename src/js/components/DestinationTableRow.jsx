'use strict'
import {EditableTextCell} from "bootstrap-react-components"
import React              from "react"
import RowControlButtons  from "../components/controls/RowControlButtons"

export default class DestinationTableRow extends React.Component {

	constructor (props) {
		super(props)
		let {_id} =props.destination
		this.state={
			editing: !_id
		}
	}

	edit () {
		this.setState({
										editing: true
									})
	}

	onChange (event) {
		switch (event.target.id) {
			case "name":
				this.props.destination.name=event.target.value
				break
			case "type":
				this.props.destination.type=event.target.value
				break
			case "url":
				this.props.destination.url=event.target.value
				break
		}
	}

	render () {
		let {editing}        =this.state
		let {name, type, url}=this.props.destination

		return (
			<tr >
				<EditableTextCell id = "name" type = "text" value = {name} onChange = {this.onChange.bind(this)}
													edit = {editing} />
				<EditableTextCell id = "type" type = "text" value = {type} onChange = {this.onChange.bind(this)}
													edit = {editing} />
				<EditableTextCell id = "url" type = "url" value = {url} onChange = {this.onChange.bind(this)}
													edit = {editing} />
				<td >
					<RowControlButtons editing = {editing} edit = {this.edit.bind(this)} save = {this.save.bind(this)}
														 remove = {this.remove.bind(this)} />
				</td >
			</tr >
		)
	}

	remove () {
		this.props.deleteDestination(this.props.destination)
	}

	save () {
		this.props.saveDestination(this.props.destination)
		this.setState({
										editing: false
									})
	}
}
