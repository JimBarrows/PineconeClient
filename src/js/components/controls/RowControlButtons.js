'use strict'
import {ButtonGroup} from "bootstrap-react-components"
import React         from "react"

export default class RowControlButtons extends React.Component {

	render () {
		let {editing, edit, id, save, remove}=this.props

		let buttonGroup=editing ? (<ButtonGroup >
			<button id = {id + "SaveButton"} type = "button" class = "btn btn-default btn-xs" onClick = {save} >
				<span class = "glyphicon glyphicon-ok" />
			</button >
		</ButtonGroup >) : (<ButtonGroup >
			<button id = {id + "EditButton"} type = "button" class = "btn btn-default btn-xs" onClick = {edit} >
				<span class = "glyphicon glyphicon-pencil" />
			</button >
			<button id = {id + "RemoveButton"} type = "button" class = "btn btn-danger btn-xs" onClick = {remove} >
				<span class = "glyphicon glyphicon-remove" />
			</button >
		</ButtonGroup >)
		return buttonGroup
	}
}
