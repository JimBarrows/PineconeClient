'use strict';
import React from "react";
import * as ChannelAction from "../actions/ChannelAction";

export default class FacebookDestinationRow extends React.Component {

	constructor(props) {
		super(props);
		let {index, facebookDestination}                        = props;
		let {accessToken, accessTokenSecret, _id, name, pageId} = facebookDestination;
		this.state                                              = {
			accessToken,
			accessTokenSecret,
			_id,
			name,
			pageId,
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
		}
	}

	edit() {
		this.setState({
			edit: true
		})
	}

	save() {
		let {accessToken, accessTokenSecret, _id, name, pageId} = this.state;
		ChannelAction.updateFacebookDestination({
			accessToken, accessTokenSecret, _id, name, pageId
		});
		this.setState({
			edit: false
		})
	}

	delete() {
		let {accessToken, accessTokenSecret, _id, name, pageId} = this.state;
		ChannelAction.deleteFacebookDestination({
			accessToken, accessTokenSecret, _id, name, pageId
		});
	}

	render() {
		let {accessToken, accessTokenSecret, _id, name, pageId, index, edit} = this.state;
		let id                                                               = _id || "tdr_" + index;
		let nameTd                                                           = edit ?
				<td><input name="name" type="text" defaultValue={name} onChange={this.onChange.bind(this)}/></td> :
				<td>{name}</td>;
		let buttonTd                                                         = edit ? (<td>
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
					{buttonTd}
				</tr>
		);
	}
}