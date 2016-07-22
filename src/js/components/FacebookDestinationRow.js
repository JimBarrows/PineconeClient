'use strict';
import React from "react";
import * as ChannelAction from "../actions/ChannelAction";

export default class FacebookDestinationRow extends React.Component {

	constructor(props) {
		super(props);
		let {index, name, pageId, _id} = props;
		this.state = {
			index,
			name,
			pageId,
			_id,
			edit: (!name || !pageId)
		};
	}

	onChange(event) {
		switch (event.target.name) {
			case "name":
				this.setState({
					name: event.target.value
				});
				break;
			case "pageId":
				this.setState({
					pageId: event.target.value
				});
				break;
		}
	}

	edit() {
		this.setState({
			edit: true
		})
	}

	delete() {
		let {_id, index, name, pageId} = this.state;
		ChannelAction.deleteFacebookDestination({
			_id,
			index,
			name,
			pageId
		});
	}

	save() {
		let {_id, index, name, pageId} = this.state;
		ChannelAction.updateFacebookDestination({
			_id,
			index,
			name,
			pageId
		});
		this.setState({
			edit: false
		})
	}

	render() {
		let {name, pageId, index, edit} = this.state;
		let nameTd   = edit ? <td><input name="name" type="text" value={name} onChange={this.onChange.bind(this)}/></td> :
				<td>{name}</td>;
		let pageIdTd = edit ?
				<td><input name="pageId" type="text" value={pageId} onChange={this.onChange.bind(this)}/></td> :
				<td>{pageId}</td>;
		let buttonTd = edit ? (<td>
			<button type="button" class="btn btn-default btn-xs" onClick={this.save.bind(this)}>
				<span class="glyphicon glyphicon-ok"/>
			</button>
		</td>) : (<td>
			<button type="button" class="btn btn-default btn-xs" onClick={this.edit.bind(this)}>
				<span class="glyphicon glyphicon-pencil"/>
			</button>
			<button type="button" class="btn btn-danger btn-xs" onClick={this.delete.bind(this)}>
				<span class="glyphicon glyphicon-remove"/>
			</button>
		</td>);

		return (
				<tr key={index}>
					{nameTd}
					{pageIdTd}
					{buttonTd}
				</tr>
		);
	}
}