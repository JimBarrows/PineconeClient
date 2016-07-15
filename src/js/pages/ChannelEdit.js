'use strict';
import * as ChannelAction from "../actions/ChannelAction";
import ChannelStore from "../stores/ChannelStore";
import {ChannelStoreEventName} from "../constants";
import FormGroup from "../components/bootstrap/FormGroup";
import PageHeader from "../components/bootstrap/PageHeader";
import React from "react";
import {withRouter} from "react-router";
import WordPressDestinationList from "../components/WordPressDestinationList";

export default withRouter(class ChannelEdit extends React.Component {

	constructor(props) {
		super();
		this.backToList = this.backToList.bind(this);
		let {channelId} = props.location.query;
		let {_id, name, wordPressDestinations} = (channelId) ? ChannelStore.findById(channelId) : {
			_id: "",
			name: "",
			wordPressDestinations: []
		};
		if (!wordPressDestinations) {
			wordPressDestinations = [];
		}
		this.state = {
			error: false,
			channelNameError: false,
			_id,
			name,
			wordPressDestinations
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

		if (this.state._id) {
			let {_id, name, wordPressDestinations} = this.state;
			ChannelAction.updateChannel({_id, name, wordPressDestinations});
		} else {
			let {name, wordPressDestinations} = this.state;
			ChannelAction.createChannel({name, wordPressDestinations});
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

	render() {
		let {error, channelNameError, name, wordPressDestinations} = this.state;
		return (
				<div class="channelEdit">
					<PageHeader title="Edit Channel"/>
					<FormGroup
							label="ChannelName"
							type="text" value={name} placeholder="Channel Name" name="channelName" error={channelNameError}
							onChange={this.handleFieldEvent.bind(this)}/>
					<div class="panel panel-default">
						<div class="panel-heading clearfix">
							<div class="panel-title pull-left">Word Press Destinations</div>
							<div class="btn-group pull-right">
								<button type="button" class="btn btn-default btn-xs" onClick={this.addWordPressDestination.bind(this)}>
									<span class="glyphicon glyphicon-plus"/></button>
								<button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-refresh"/>
								</button>
							</div>
						</div>
						<div class="panel-body">
							<div>
								<WordPressDestinationList list={wordPressDestinations} onRowChange={this.handleChangeEvent.bind(this)}
								                          deleteDestination={this.deleteDestination.bind(this)}/>
							</div>
						</div>
					</div>
					<button type="button" class="btn btn-primary" onClick={this.saveChannel.bind(this)}>Save
					</button>
					<button type="button" class="btn btn-default" onClick={this.cancel.bind(this)}>Cancel</button>
				</div>
		)
	}
});