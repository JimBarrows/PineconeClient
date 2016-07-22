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
		this.change     = this.change.bind(this);
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
		ChannelStore.on(ChannelStoreEventName.CURRENT_CHANNEL_CHANGE, this.change);
	}

	componentWillUnmount() {
		ChannelStore.removeListener(ChannelStoreEventName.CHANGE, this.backToList);
		ChannelStore.removeListener(ChannelStoreEventName.CURRENT_CHANNEL_CHANGE, this.change);
	}

	handleFieldEvent(event) {
		switch (event.target.id) {
			case "channelName":
				this.setState({name: event.target.value});
				break;
		}
	}

	change() {
		let {name, wordPressDestinations, facebookDestinations} = ChannelStore.current();
		let _id = ChannelStore.current()._id || null;
		this.setState({
			_id,
			name,
			wordPressDestinations,
			facebookDestinations
		})
	}

	backToList() {
		console.log("ChannelEdit.backToList");
		this.props.router.push('/');
	}

	cancel() {
		this.props.router.push('/');
	}

	saveChannel() {
		console.log("ChannelEdit.saveChannel");
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

	wordpressRowChangeEvent(index, event) {
		let {wordPressDestinations} = this.state;
		let destination = wordPressDestinations[index];
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
		wordPressDestinations[index] = destination;
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
		ChannelAction.addFacebookDestination();
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
						                          onRowChange={this.wordpressRowChangeEvent.bind(this)}
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