'use strict';
import * as Actions from "../actions/BlogPostActions";
import {CampaignEvent} from "../constants";
import BlogPostForm from "../components/BlogPostForm";
import CampaignStore from "../stores/CampaignStore";
import {PageHeader} from "bootstrap-react-components";
import React from "react";
import {withRouter} from "react-router";


class EditBlogPost extends React.Component {

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
		let blogPost = CampaignStore.findBlogPostById(this.props.routeParams.blogPostId);
		return (
				<div id="newBlogPostPage">
					<PageHeader >
						<h1>Edit Blog Post</h1>
					</PageHeader>
					<BlogPostForm blogPost={blogPost} onSubmit={this.onSubmit.bind(this)}/>
				</div>
		);
	}

	onSubmit(blogId, campaignId, blogPost) {
		Actions.update(blogId, campaignId, blogPost);
	}

	saveFailure() {
		this.setState({
			error: "Could not save blog post"
		})
	}

	saveSucces() {
		this.props.router.push('/campaign/' + this.props.routeParams.campaignId);
	}
}

export default withRouter(EditBlogPost);