'use strict';
import {BlogPostEventNames} from "../constants";
import BlogPostForm from "../components/BlogPostForm";
import {PageHeader} from "bootstrap-react-components";
import React from "react";

export default class NewBlogPost extends React.Component {

	constructor(props) {
		super(props);
		this.saveSucces  = this.saveSucces.bind(this);
		this.saveFailure = this.saveFailure.bind(this);
	}

	componentWillMount() {
		BlogPostStore.on(BlogPostEventNames.BLOG_POST_UPDATE_FAILURE, this.saveFailure);
		BlogPostStore.on(BlogPostEventNames.BLOG_POST_UPDATE_SUCCESS, this.saveSucces);
	}

	componentWillUnmount() {
		BlogPostStore.removeListener(BlogPostEventNames.BLOG_POST_CREATE_SUCCESS, this.saveSucces);
		BlogPostStore.removeListener(BlogPostEventNames.BLOG_POST_CREATE_FAILURE, this.saveFailure);
	}

	render() {
		return (
				<div id="newBlogPostPage">
					<PageHeader >
						<h1>New Blog Post</h1>
					</PageHeader>
					<BlogPostForm campaignId={this.props.routeParams.campaignId}/>
				</div>
		);
	}

	saveFailure() {
		this.setState({
			error: BlogPostStore.error()
		})
	}

	saveSucces() {
		this.props.router.push('/content');
	}
}