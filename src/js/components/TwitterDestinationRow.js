'use strict';
import {EditableCell} from "bootstrap-react-components";
import React from "react";
import RowControlButtons from "../components/controls/RowControlButtons";
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

		return (
				<tr id={id}>
					<EditableCell id="name" type="text" value={name} onChange={this.onChange.bind(this)} edit={editing}/>
					<EditableCell id="accessToken" type="text" value={accessToken} onChange={this.onChange.bind(this)}
					              edit={editing}/>
					<EditableCell id="accessTokenSecret" type="text" value={accessTokenSecret} onChange={this.onChange.bind(this)}
					              edit={editing}/>
					<EditableCell id="owner" type="text" value={owner} onChange={this.onChange.bind(this)} edit={editing}/>
					<EditableCell id="ownerId" type="text" value={ownerId} onChange={this.onChange.bind(this)} edit={editing}/>
					<td>
						<RowControlButtons editing={editing} edit={this.edit.bind(this)} save={this.save.bind(this)}
						                   remove={this.remove.bind(this)}/>
					</td>
				</tr>
		);
	}
}