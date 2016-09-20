'use strict';

import BlogPostStore from "../stores/BlogPostStore";
import {BlogPostEventNames, CampaignEvent} from "../constants";
import * as CampaignAction from "../actions/CampaignActions";
import CampaignForm from "../components/CampaignForm";
import CampaignStore from "../stores/CampaignStore";
import {PageHeader} from "bootstrap-react-components";
import React from "react";
import {withRouter} from "react-router";


class CampaignEdit extends React.Component {

	componentDidMount() {
		CampaignAction.findById(this.props.routeParams.campaignId);
	}

	componentWillMount() {
		BlogPostStore.on(BlogPostEventNames.BLOG_POST_CREATE_SUCCESS, this.updateBlogPosts);
		CampaignStore.on(CampaignEvent.LOAD_CAMPAIGN_SUCCESS, this.update);
		CampaignStore.on(CampaignEvent.UPDATE_SUCCESS, this.update);
	}

	componentWillUnmount() {
		BlogPostStore.removeListener(BlogPostEventNames.BLOG_POST_CREATE_SUCCESS, this.updateBlogPosts);
		CampaignStore.removeListener(CampaignEvent.LOAD_CAMPAIGN_SUCCESS, this.update);
		CampaignStore.removeListener(CampaignEvent.UPDATE_SUCCESS, this.update);

	}

	constructor() {
		super();
		this.update          = this.update.bind(this);
		this.updateBlogPosts = this.updateBlogPosts.bind(this);
		this.state           = {
			campaign: CampaignStore.campaign
		}
	}

	onSubmit(campaign) {
		CampaignAction.update(campaign);
		this.props.router.push('/');
	}

	render() {
		return (
				<div id="campaignEditPage">
					<PageHeader>
						<h1>Edit Campaign</h1>
					</PageHeader>
					<CampaignForm campaign={this.state.campaign} onSubmit={this.onSubmit.bind(this)}/>
				</div>
		);
	}

	update() {
		this.setState({
			campaign: CampaignStore.campaign
		})
	}

	updateBlogPosts() {
		let campaign       = this.state.campaign;
		campaign.blogPosts = BlogPostStore.all;
		this.setState({
			campaign: campaign
		})
	}
}
export default withRouter(CampaignEdit);