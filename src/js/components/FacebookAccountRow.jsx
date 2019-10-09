'use strict'

import {EditableTextCell} from "bootstrap-react-components"
import React              from "react"
import RowControlButtons  from "../components/controls/RowControlButtons"

export default class TwitterAccountRow extends React.Component {

	constructor (props) {
		super(props)
		let {_id} =props.item
		this.state={
			editing: !_id
		}
	}

	edit () {
		this.setState({
										editing: true
									})
	}

	onChange=event => {
		switch (event.target.id) {
			case "name":
				this.props.item.name=event.target.value
				break
		}
	}

	remove () {
		this.props.deleteItem(this.props.item)
	}

	render () {
		let {editing}=this.state
		let {item}   =this.props
		let {name}   =item

		return (
			<tr >
				<EditableTextCell id = "name" type = "text" value = {name} onChange = {this.onChange}
													edit = {editing} />
				<td >
					<RowControlButtons editing = {editing}
														 edit = {this.edit.bind(this)}
														 save = {this.save.bind(this)}
														 remove = {this.remove.bind(this)} />
				</td >
			</tr >
		)
	}

	save () {
		this.props.saveItem(this.props.item)
		this.setState({
										editing: false
									})
	}
}
