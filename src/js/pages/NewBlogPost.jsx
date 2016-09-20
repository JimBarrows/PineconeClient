'use strict';
import * as Actions from "../actions/BlogPostActions";
import {CampaignEvent} from "../constants";
import BlogPostForm from "../components/BlogPostForm";
import CampaignStore from "../stores/CampaignStore";
import moment from "moment";
import {PageHeader} from "bootstrap-react-components";
import React from "react";
import {withRouter} from "react-router";


class NewBlogPost extends React.Component {

	componentWillMount() {
		CampaignStore.on(CampaignEvent.UPDATE_FAILURE, this.saveFailure);
		CampaignStore.on(CampaignEvent.UPDATE_SUCCESS, this.saveSucces);
	}

	componentWillUnmount() {
		CampaignStore.removeListener(CampaignEvent.UPDATE_FAILURE, this.saveFailure);
		CampaignStore.removeListener(CampaignEvent.UPDATE_SUCCESS, this.saveSucces);

	}
	constructor(props) {
		super(props);
		this.saveSucces  = this.saveSucces.bind(this);
		this.saveFailure = this.saveFailure.bind(this);
	}


	render() {
		let blogPost = {
			_id: '',
			body: '',
			createDate: moment(),
			publishDate: moment(),
			title: '',
			wordpress: {
				excerpt: '',
				status: 'publish',
				format: '',
				useBody: true,
				count: 140,
				typeToCount: 'characters'
			},
			twitter: {
				status: '',
				useTitle: true
			},
			facebook: {
				post: '',
				useBody: true
			},
			valid: true
		};
		return (
				<div id="newBlogPostPage">
					<PageHeader >
						<h1>New Blog Post</h1>
					</PageHeader>
					<BlogPostForm blogPost={blogPost} onSubmit={this.onSubmit.bind(this)}/>
				</div>
		);
	}

	onSubmit(blogId, campaignId, blogPost) {
		Actions.create(campaignId, blogPost);
	}

	saveFailure() {
		this.setState({
			error: BlogPostStore.error()
		})
	}

	saveSucces() {
		this.props.router.push('campaign/' + CampaignStore._id);
	}
}
export default withRouter(NewBlogPost);