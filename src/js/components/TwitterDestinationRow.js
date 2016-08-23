'use strict';
import React from "react";
import * as ChannelAction from "../actions/ChannelAction";

export default class TwitterDestinationRow extends React.Component {

	constructor(props) {
		super(props);
		let {index, twitterDestination} = props;
		let {accessToken, accessTokenSecret, _id, name, owner, ownerId} = twitterDestination;
		this.state = {
			accessToken, accessTokenSecret, _id, index, name, owner, ownerId,
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
			case "accessToken":
				this.setState({
					accessToken: event.target.value
				});
				break;
			case "accessTokenSecret":
				this.setState({
					accessTokenSecret: event.target.value
				});
				break;
			case "owner":
				this.setState({
					owner: event.target.value
				});
				break;
			case "ownerId":
				this.setState({
					ownerId: event.target.value
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
		let {accessToken, accessTokenSecret, _id, name, owner, ownerId} = this.state;
		ChannelAction.updateTwitterDestination({
			accessToken, accessTokenSecret, _id, name, owner, ownerId
		});
		this.setState({
			edit: false
		})
	}

	delete() {
		let {accessToken, accessTokenSecret, edit, _id, index, name, owner, ownerId} = this.state;
		ChannelAction.deleteTwitterDestination({
			accessToken, accessTokenSecret, edit, _id, index, name, owner, ownerId
		});
	}

	render() {
		let {accessToken, accessTokenSecret, edit, _id, index, name, owner, ownerId} = this.state;
		let id                  = _id || "tdr_" + index;
		let nameTd              = edit ?
				<td><input name="name" type="text" defaultValue={name} onChange={this.onChange.bind(this)}/></td> :
				<td>{name}</td>;
		let accessTokenTd       = edit ?
				<td><input name="accessToken" type="text" defaultValue={accessToken} onChange={this.onChange.bind(this)}/>
				</td> :
				<td>{accessToken}</td>;
		let accessTokenSecretTd = edit ?
				<td><input name="accessTokenSecret" type="text" defaultValue={accessTokenSecret}
				           onChange={this.onChange.bind(this)}/>
				</td> :
				<td>{accessTokenSecret}</td>;
		let ownerTd             = edit ?
				<td><input name="owner" type="text" defaultValue={owner} onChange={this.onChange.bind(this)}/>
				</td> :
				<td>{owner}</td>;
		let ownerIdTd           = edit ?
				<td><input name="ownerId" type="text" defaultValue={ownerId} onChange={this.onChange.bind(this)}/>
				</td> :
				<td>{ownerId}</td>;
		let buttonTd            = edit ? (<td>
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
					{ownerTd}
					{ownerIdTd}
					{accessTokenTd}
					{accessTokenSecretTd}
					{buttonTd}
				</tr>
		);
	}
}