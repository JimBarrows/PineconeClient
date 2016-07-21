'use strict';
import * as ChannelAction from "../actions/ChannelAction";
import ChannelStore from "../stores/ChannelStore";
import {ChannelStoreEventName} from "../constants";
import FormGroup from "../components/bootstrap/FormGroup";
import PageHeader from "../components/bootstrap/PageHeader";
import React from "react";
import {withRouter} from "react-router";
import WordPressDestinationList from "../components/WordPressDestinationList";
import TablePanel from "../components/bootstrap/TablePanel";
import FacebookDestinationList from "../components/FacebookDestinationList";

export default withRouter(class ChannelEdit extends React.Component {

	constructor(props) {
		super();
		this.backToList = this.backToList.bind(this);
		let {name, wordPressDestinations, facebookDestinations} = ChannelStore.current();
		let _id         = ChannelStore.current()._id || null;
		this.state      = {
			error: false,
			channelNameError: false,
			_id,
			name,
			wordPressDestinations,
			facebookDestinations
		}
	}

	componentWillMount() {
		ChannelStore.on(ChannelStoreEventName.CHANGE, this.backToList);
	}

	componentWillUnmount() {
		ChannelStore.removeListener(ChannelStoreEventName.CHANGE, this.backToList);
	}

	handleFieldEvent(event) {
		switch (event.target.id) {
			case "channelName":
				this.setState({name: event.target.value});
				break;
		}
	}

	backToList() {
		this.props.router.push('/');
	}

	cancel() {
		this.props.router.push('/');
	}

	saveChannel() {
		let {name, wordPressDestinations, facebookDestinations} = this.state;
		if (this.state._id) {
			ChannelAction.updateChannel({_id: this.state._id, name, wordPressDestinations, facebookDestinations});
		} else {
			ChannelAction.createChannel({name, wordPressDestinations, facebookDestinations});
		}
	}

	addWordPressDestination() {
		let {wordPressDestinations} = this.state;
		wordPressDestinations.push({
			name: "",
			url: "",
			username: "",
			password: ""
		});
		this.setState({
			wordPressDestinations
		})
	}

	addFacebookDestination(name, email, accessToken, expiresIn, signedRequest, userID) {
		let {facebookDestinations} = this.state;
		facebookDestinations.push({
			name,
			email,
			accessToken,
			expiresIn,
			signedRequest,
			userId: userID
		});
		console.log("facebookDestinations: ", facebookDestinations);
		this.setState({
			facebookDestinations
		})
	}

	handleChangeEvent(index, event) {
		let {wordPressDestinations} = this.state;
		let destination = wordPressDestinations[index - 1];
		switch (event.target.name) {
			case "name":
				destination.name = event.target.value;
				break;
			case "url":
				destination.url = event.target.value;
				break;
			case "username":
				destination.username = event.target.value;
				break;
			case "password":
				destination.password = event.target.value;
				break;
		}
		wordPressDestinations[index - 1] = destination;
		this.setState({
			wordPressDestinations
		})
	}

	deleteDestination(destination) {
		let {wordPressDestinations} = this.state;
		this.setState({
			wordPressDestinations: wordPressDestinations.filter(d=>d.name !== destination.name)
		})
	}

	addFacebookDestinationRow() {
		console.log("Add facebook destination row");
	}

	render() {
		let {error, channelNameError, name, wordPressDestinations, facebookDestinations} = this.state;
		return (
				<div class="channelEdit">
					<PageHeader title="Edit Channel"/>
					<FormGroup
							label="ChannelName"
							type="text" value={name} placeholder="Channel Name" name="channelName" error={channelNameError}
							onChange={this.handleFieldEvent.bind(this)}/>
					<TablePanel title="Word Press Destinations" addRow={this.addWordPressDestination.bind(this)}>
						<WordPressDestinationList list={wordPressDestinations}
						                          onRowChange={this.handleChangeEvent.bind(this)}
						                          deleteDestination={this.deleteDestination.bind(this)}/>
					</TablePanel>
					<TablePanel title="Facebook" addRow={this.addFacebookDestinationRow.bind(this)}>
						<FacebookDestinationList list={facebookDestinations}/>
					</TablePanel>
					<button type="button" class="btn btn-primary" onClick={this.saveChannel.bind(this)}>Save
					</button>
					<button type="button" class="btn btn-default" onClick={this.cancel.bind(this)}>Cancel</button>
				</div>
		)
	}
});