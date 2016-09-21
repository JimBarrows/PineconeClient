'use strict';
import AssetListPanel from "../components/AssetListPanel";
import BudgetPanel from "../components/BudgetPanel";
import * as BlogPostActions from "../actions/BlogPostActions";
import BlogPostPanel from "./BlogPostPanel";
import {DateRangeFormGroup, TextFormGroup} from "bootstrap-react-components";
import DestinationListPanel from "../components/DestinationListPanel";
import KeywordsListPanel from "../components/KeywordListPanel";
import MessagesListPanel from "../components/MessageListPanel";
import ObjectivesListPanel from "../components/ObjectiveListPanel";
import React from "react";
import {withRouter} from "react-router";


class CampaignForm extends React.Component {

	addBlogPost() {
		this.props.router.push(`campaign/${this.props.campaign._id}/blogPosts/new`);
	}

	deleteAsset(asset) {
		this.props.campaign.assets = this.props.campaign.assets.filter((cur) => cur._id !== asset._id);
		this.setState({});
	}

	deleteBlogPost(blogPost) {
		BlogPostActions.remove(blogPost._id, this.props.campaign._id);
	}

	deleteBudget(budget) {
		this.props.campaign.budgets = this.props.campaign.budgets.filter((cur) => cur._id !== budget._id);
		this.setState({});
	}

	deleteDestination(destination) {
		this.props.campaign.destinations = this.props.campaign.destinations.filter((cur) => cur._id !== destination._id);
		this.setState({});
	}

	deleteKeyword(keyword) {
		this.props.campaign.keywords = this.props.campaign.keywords.filter((cur) => cur._id !== keyword._id);
		this.setState({});
	}

	deleteMessage(message) {
		this.props.campaign.messages = this.props.campaign.messages.filter((cur) => cur._id !== message._id);
		this.setState({});
	}

	deleteObjective(objective) {
		this.props.campaign.objectives = this.props.campaign.objectives.filter((cur) => cur._id !== objective._id);
		this.setState({});
	}

	fieldChange(event) {
		switch (event.target.id) {
			case "effectiveFrom":
				this.props.campaign.effectiveFrom = event.target.value;
				break;
			case 'effectiveThru':
				this.props.campaign.effectiveThru = event.target.value;
				break;
			case'name':
				this.props.campaign.name = event.target.value;
				break;
		}
		this.setState({});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onSubmit({
			assets: this.props.campaign.assets,
			budgetLineItems: this.props.campaign.budgetLineItems,
			destinations: this.props.campaign.destinations,
			effectiveFrom: this.props.campaign.effectiveFrom,
			effectiveThru: this.props.campaign.effectiveThru,
			facebookAccounts: this.props.campaign.facebookAccounts,
			_id: this.props.campaign._id,
			keywords: this.props.campaign.keywords,
			messages: this.props.campaign.messages,
			name: this.props.campaign.name,
			objectives: this.props.campaign.objectives,
			owner: this.props.campaign.owner,
			tags: this.props.campaign.tags,
			twitterAccounts: this.props.campaign.twitterAccounts,
			wordPressAccounts: this.props.campaign.wordPressAccounts
		});
	}

	render() {
		let {
				    assets,
				    blogPosts,
				    budgetLineItems,
				    destinations,
				    effectiveFrom,
				    effectiveThru,
				    facebookAccounts,
				    keywords,
				    messages,
				    name,
				    objectives,
				    owner,
				    tags,
				    twitterAccounts,
				    wordPressAccounts
		    } = this.props.campaign;
		return (
				<form id="campaignForm" onSubmit={this.handleSubmit.bind(this)}>
					<TextFormGroup label="Name"
					               id="name"
					               onChange={this.fieldChange.bind(this)}
					               error=""
					               value={name}
					               placeholder="Christmas Campaign"/>
					<DateRangeFormGroup label="Effective"
					                    id="effective"
					                    onChange={this.fieldChange.bind(this)}
					                    error=""
					                    fromValue={effectiveFrom}
					                    thruValue={effectiveThru}
					                    dateFormat="MM/DD/YYYY"
					                    disabled={false}/>
					<TextFormGroup label="Tags" id="tags"/>
					<button id="saveCampaignButton" type="submit" class="btn btn-success">Save</button>
					<AssetListPanel assets={assets} deleteAsset={this.deleteAsset.bind(this)}
					                saveAsset={this.saveAsset.bind(this)}/>
					<BlogPostPanel add={this.addBlogPost.bind(this)}
					               deleteItem={this.deleteBlogPost.bind(this)}
					               items={blogPosts}
					               saveItem={this.saveBlogPost.bind(this)}
					               updateItem={(this.updateBlogPost.bind(this))}/>
					<BudgetPanel id="budgetPanel" budgetLineItems={budgetLineItems} deleteBudget={this.deleteBudget.bind(this)}
					             saveBudget={this.saveBudget.bind(this)}/>
					<DestinationListPanel destinations={destinations} deleteDestination={this.deleteDestination.bind(this)}
					                      saveDestination={this.saveDestination.bind(this)}/>
					<KeywordsListPanel keywords={keywords} deleteKeyword={this.deleteKeyword.bind(this)}
					                   saveKeyword={this.saveKeyword.bind(this)}/>
					<MessagesListPanel messages={messages} deleteMessage={this.deleteMessage.bind(this)}
					                   saveMessage={this.saveMessage.bind(this)}/>
					<ObjectivesListPanel objectives={objectives} deleteObjective={this.deleteObjective.bind(this)}
					                     saveObjective={this.saveObjective.bind(this)}/>
				</form>
		);
	}

	saveAsset(asset) {
		this.setState({});
	}

	saveBlogPost(blogPost) {
		this.setState({});
	}

	saveBudget(budget) {
		this.setState({});
	}

	saveDestination(destination) {
		this.setState({});
	}

	saveKeyword(keyword) {
		this.setState({});
	}

	saveMessage(message) {
		this.setState({});
	}

	saveObjective(objective) {
		this.setState({});
	}

	updateBlogPost(blogPost) {
		this.props.router.push(`/campaign/${this.props.campaign._id}/blogPosts/${blogPost._id}`);
	}
}

export default withRouter(CampaignForm);