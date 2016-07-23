'use strict';
import React from "react";
import * as ChannelAction from "../actions/ChannelAction";

export default class TwitterDestinationRow extends React.Component {

	constructor(props) {
		super(props);
		let {index, twitterDestination} = props;
		let {_id, name, oauthToken, oauthVerifier, accessToken} = twitterDestination;
		this.state = {
			_id,
			index,
			name,
			oauthToken,
			oauthVerifier,
			accessToken,
			edit: !(name)
		};
	}

	onChange(event) {
		switch (event.target.name) {
			case "name":
				this.setState({
					name: event.target.value
				});
				break;
		}
	}

	edit() {
		this.setState({
			edit: true
		})
	}

	save() {
		let {accessToken, _id, index, name, oauthToken, oauthVerifier} = this.state;
		ChannelAction.updateTwitterDestination({
			accessToken,
			_id,
			index,
			name,
			oauthToken,
			oauthVerifier
		});
		this.setState({
			edit: false
		})
	}

	delete() {
		let {accessToken, _id, index, name, oauthToken, oauthVerifier} = this.state;
		ChannelAction.deleteTwitterDestination({
			accessToken, _id, index, name, oauthToken, oauthVerifier
		});
	}

	render() {
		let {accessToken, edit, _id, index, name, oauthToken, oauthVerifier} = this.state;
		let id       = _id || "tdr_" + index;
		let nameTd   = edit ? <td><input name="name" type="text" value={name} onChange={this.onChange.bind(this)}/></td> :
				<td>{name}</td>;
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
				<tr id={id}>
					{nameTd}
					<td>{oauthToken}</td>
					<td>{oauthVerifier}</td>
					<td>{accessToken}</td>
					{buttonTd}
				</tr>
		);
	}
}