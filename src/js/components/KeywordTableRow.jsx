'use strict'

import {EditableTextCell} from "bootstrap-react-components"
import React              from "react"
import RowControlButtons  from "../components/controls/RowControlButtons"


export default class KeywordTableRow extends React.Component {

	constructor (props) {
		super(props)
		let {_id} =props.keyword
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
			case "keyword":
				this.props.keyword.name=event.target.value
				break
		}
	}

	render () {
		let {editing}=this.state
		let {name}   =this.props.keyword

		return (
			<tr >
				<EditableTextCell id = "keyword" type = "text" value = {name} onChange = {this.onChange.bind(this)}
													edit = {editing} />
				<td >
					<RowControlButtons editing = {editing} edit = {this.edit.bind(this)} save = {this.save.bind(this)}
														 remove = {this.remove.bind(this)} />
				</td >
			</tr >
		)
	}

	remove () {
		this.props.deleteKeyword(this.props.keyword)
	}

	save () {
		this.props.saveKeyword(this.props.keyword)
		this.setState({
										editing: false
									})
	}
}
