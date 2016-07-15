'use strict';
import React from "react";
import PageHeader from "../components/bootstrap/PageHeader";
import * as Actions from "../actions/ContentActions";
import FormGroup from "../components/bootstrap/FormGroup";
import {withRouter} from "react-router";
import ContentStore from "../stores/ContentStore";
import {ContentEventNames} from "../constants";
import moment from "moment";
import ChannelStore from "../stores/ChannelStore";

export default withRouter(class ContentEdit extends React.Component {

	constructor(props) {
		super();
		this.saveSucces  = this.saveSucces.bind(this);
		this.saveFailure = this.saveFailure.bind(this);
		let {contentId} = props.location.query;
		let {_id, body, channel, createDate, owner, publishDate, title, wpFields} = contentId ? ContentStore.findById(contentId) : {
			_id: '',
			body: '',
			channel: '',
			createDate: moment(),
			publishDate: moment(),
			title: '',
			wpFields: {
				excerpt: '',
				status: '',
				format: ''
			}
		};
		if (!wpFields) {
			wpFields = {
				excerpt: '',
				status: '',
				format: ''
			}
		}
		this.state = {
			_id, body, channel, createDate, owner, publishDate, title, wpFields
		}
	}

	componentWillMount() {
		ContentStore.on(ContentEventNames.CONTENT_CREATE_SUCCESS, this.saveSucces);
		ContentStore.on(ContentEventNames.CONTENT_CREATE_FAILURE, this.saveFailure);
		Actions.load();
	}

	componentWillUnmount() {
		ContentStore.removeListener(ContentEventNames.CONTENT_CREATE_SUCCESS, this.saveSucces);
		ContentStore.removeListener(ContentEventNames.CONTENT_CREATE_FAILURE, this.saveFailure);
	}

	fieldChange(event) {
		switch (event.target.id) {
			case "body" :
				this.setState({
					body: event.target.value
				});
				break;
			case "channel" :
				this.setState({
					channel: event.target.value
				});
				break;
			case "title" :
				this.setState({
					title: event.target.value
				});
				break;
			case "wpExcerpt" :
				this.state.wpFields.excerpt = event.target.value;
				this.setState({
					wpFields: this.state.wpFields
				});
				break;
			case "wpStatus":
				this.state.wpFields.status = event.target.value;
				this.setState({
					wpFields: this.state.wpFields
				});
				break;
			case"wpFormat" :
				this.state.wpFields.format = event.target.value;
				this.setState({
					wpFields: this.state.wpFields
				});
				break;
		}
	};

	publishDateChange(publishDate) {
		this.setState({
			publishDate
		})
	}

	save() {
		let {_id, body, channel, createDate, owner, publishDate, title, wpFields} = this.state;
		let valid = true;
		if (!body) {
			this.setState({
				bodyError: "Content must have a body"
			});
			valid = false;
		}
		if (!channel) {
			this.setState({
				channelError: "Content must have a channel"
			});
			valid = false;
		}

		if (!publishDate || !publishDate.trim()) {
			this.setState({
				publishDateError: "Content must have a publish date"
			});
			valid = false;
		}
		if (!title) {
			this.setState({
				titleError: "Content must have a title"
			});
			valid = false;
		}

		if (valid) {
			if (this.state._id) {
				Actions.update(_id, {body, channel, createDate, owner, publishDate, title, wpFields});
			} else {
				Actions.create({body, channel, createDate, owner, publishDate, title, wpFields});
			}
		}
	}

	saveSucces() {
		this.props.router.push('/content');
	}

	saveFailure() {
		this.setState({
			error: ContentStore.error()
		})
	}

	cancel() {
		this.props.router.push('/content');
	}

	render() {
		let {_id, body, channel, createDate, owner, publishDate, title, wpFields} = this.state;
		let {titleError, bodyError, publishDateError, excerptError, statusError, channelError, formatError} = this.state;
		let channelOptions = ChannelStore.getAll().map((channel) => {
			return {
				value: channel._id, label: channel.name
			}
		});
		return (
				<div class="contentEdit">
					<PageHeader title="Edit Content"/>
					<FormGroup name="title" label="Title" type="text" placeholder="10 ways to do something cool"
					           onChange={this.fieldChange.bind(this)} value={title} error={titleError}/>
					<FormGroup name="body" label="Body" type="textarea"
					           onChange={this.fieldChange.bind(this)} value={body} error={bodyError}/>
					<FormGroup name="publishDate" label="Publish Date" type="date"
					           onChange={this.publishDateChange.bind(this)} value={publishDate} error={publishDateError}/>
					<FormGroup name="channel" label="Channel" type="select"
					           onChange={this.fieldChange.bind(this)} value={channel} options={channelOptions}
					           error={channelError}/>
					<div class="panel panel-default">
						<div class="panel-heading">Word Press</div>
						<div class="panel-body">
							<FormGroup name="wpExcerpt" label="Excerpt" type="textarea"
							           onChange={this.fieldChange.bind(this)} value={wpFields.excerpt} error={excerptError}/>
							<FormGroup name="wpStatus" label="Status" type="text" placeholder="publish"
							           onChange={this.fieldChange.bind(this)} value={wpFields.status} error={statusError}/>
							<FormGroup name="wpFormat" label="Format" type="text"
							           onChange={this.fieldChange.bind(this)} value={wpFields.format} error={formatError}/>
						</div>
					</div>
					<button id='saveButton' type="button" class="btn btn-primary" onClick={this.save.bind(this)}>Save
					</button>
					<button type="button" class="btn btn-default" onClick={this.cancel.bind(this)}>Cancel</button>
				</div>
		);
	}
})