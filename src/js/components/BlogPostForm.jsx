'use strict';

import CampaignStore from "../stores/CampaignStore";
import {DatePickerFormGroup, TextAreaFormGroup, TextFormGroup} from "bootstrap-react-components";
import FacebookContent from "../components/FacebookContent";
import moment from "moment";
import React from "react";
import TwitterContent from "../components/TwitterContent";
import WordpressContent from "../components/WordPressContent";

class BlogPostForm extends React.Component {

	bodyChange(event) {
		let body = event.target.value;
		if (this.state.facebook.useBody) {
			this.state.facebook.post = body
		}
		if (this.state.wordpress.useBody) {
			let {count, typeToCount}     = this.state.wordpress;
			this.state.wordpress.excerpt = this.excerpt(count, typeToCount, body);
		}
		this.setState({
			body
		});
	}

	campaignChange(event) {
		this.setState({
			campaign: event.target.value
		});
	}

	constructor(props) {
		super(props);

		let {
				    _id, body, createDate, owner, publishDate,
				    title, wordpress, facebook, twitter
		    }               = this.props.blogPost;
		this.state          = {
			valid: true, _id, body, createDate, owner, publishDate,
			title, wordpress, facebook, twitter
		};

	}

	excerpt(count, typeToCount, body) {
		let excerpt = '';
		switch (typeToCount) {
			case 'characters':
				excerpt = body.substring(0, count);
				break;
			case 'words':
				excerpt = body.split(' ').splice(0, count).join(' ');
				break;
			case 'sentences':
				excerpt = body.split('.').splice(0, count).join('.') + ".";
				break;
		}
		return excerpt;
	}

	facebookChange(event) {
		let {facebook} = this.state;
		switch (event.target.id) {
			case "facebookPost" :
				facebook.post = event.target.value;
				this.setState({
					facebook
				});
				break;
			case "facebookUseBody" :
				facebook.useBody = !facebook.useBody;
				if (facebook.useBody) {
					facebook.post = this.state.body;
				}
				this.setState({
					facebook
				});
				break;
		}
	}

	publishDateChange(publishDate) {
		this.setState({
			publishDate: moment(publishDate)
		})
	}

	render() {
		let {
				    _id, body, createDate, owner, publishDate,
				    title, wordpress, facebook, twitter
		    }               = this.state;
		let {
				    titleError, bodyError, publishDateError, excerptError,
				    statusError, campaignError, formatError
		    }               = this.state;

		return (
				<form id="blogPostForm" onSubmit={this.save.bind(this)}>
					<TextFormGroup error={titleError}
					               id="title"
					               label="Title"
					               onChange={this.titleChange.bind(this)}
					               placeholder="10 ways to do something cool"
					               value={title}/>
					<TextAreaFormGroup error={bodyError}
					                   id="body"
					                   label="Body"
					                   onChange={this.bodyChange.bind(this)}
					                   value={body}/>
					<DatePickerFormGroup error={publishDateError}
					                     id="publishDate"
					                     label="Publish Date"
					                     onChange={this.publishDateChange.bind(this)}
					                     type="date"
					                     value={publishDate}/>
					<FacebookContent facebook={facebook} onChange={this.facebookChange.bind(this)}/>
					<TwitterContent twitter={twitter} onChange={this.twitterChange.bind(this)}/>
					<WordpressContent wordpress={wordpress} onChange={this.wordpressChange.bind(this)}/>
					<button id='saveButton' class="btn btn-primary">Save
					</button>
				</form>
		);
	}

	save(event) {
		event.preventDefault();
		this.validateBody();
		this.validatePublishDate();
		this.validateTitle();

		if (this.state.valid) {
			let {
					    _id, body, createDate, owner,
					    publishDate, title, wordpress, twitter, facebook
			    }     = this.state;
			this.props.onSubmit(_id, CampaignStore._id, {
				body,
				createDate,
				owner,
				publishDate,
				title,
				wordpress,
				facebook,
				twitter
			})
		}
	}

	titleChange(event) {
		let title = event.target.value;
		if (this.state.twitter.useTitle) {
			this.state.twitter.status = title;
		}
		this.setState({
			title
		});
	}

	twitterChange(event) {
		let {twitter} = this.state;
		switch (event.target.id) {
			case "twitterUseTitle" :
				twitter.useTitle = !twitter.useTitle;
				if (twitter.useTitle) {
					twitter.status = this.state.title
				}
				this.setState({
					twitter
				});
				break;
			case "twitterStatus" :
				twitter.status = event.target.value;
				this.setState({
					twitter
				});
				break;
		}
	}

	wordpressChange(event) {
		let {wordpress} = this.state;
		switch (event.target.id) {
			case "wordpressCount" :
				wordpress.count   = event.target.value;
				wordpress.excerpt = this.excerpt(wordpress.count, wordpress.typeToCount, this.state.body);
				this.setState({
					wordpress
				});
				break;
			case "wordpressTypeToCount" :
				console.log("ContentEdit.fieldChange ", event.target);
				wordpress.typeToCount = event.target.value;
				wordpress.excerpt     = this.excerpt(wordpress.count, wordpress.typeToCount, this.state.body);
				this.setState({
					wordpress
				});
				break;
			case "wordpressUseBody" :
				wordpress.useBody = !wordpress.useBody;
				if (wordpress.useBody) {
					wordpress.excerpt = this.excerpt(wordpress.count, wordpress.typeToCount, this.state.body);
				}
				this.setState({
					wordpress
				});
				break;
			case "wordpressExcerpt" :
				wordpress.excerpt = event.target.value;
				this.setState({
					wpFields: this.state.wpFields
				});
				break;
			case "wordpressStatus":
				wordpress.status = event.target.value;
				this.setState({
					wordpress
				});
				break;
			case"wordpressFormat" :
				wordpress.format = event.target.value;
				this.setState({
					wordpress
				});
				break;
		}
	}

	validateBody() {
		if (!this.state.body) {
			this.setState({
				bodyError: "Content must have a body",
				valid: false
			});

		} else {
			this.setState({
				bodyError: ""
			});
		}
	}

	validatePublishDate() {
		if (!this.state.publishDate) {
			this.setState({
				publishDateError: "Content must have a publish date",
				valid: false
			});
		} else {
			this.setState({
				publishDateError: ""
			});
		}
	}

	validateTitle() {
		if (!this.state.title) {
			this.setState({
				titleError: "Content must have a title",
				valid: false
			});
		} else {
			this.setState({
				titleError: ""
			});
		}
	}
}

export default BlogPostForm;