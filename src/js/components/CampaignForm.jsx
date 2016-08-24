'use strict';
import AssetListPanel from "../components/AssetListPanel";
import BudgetPanel from "../components/BudgetPanel";
import ContentListPanel from "../components/ContentListPanel";
import {DateRangeFormGroup, TextFormGroup} from "bootstrap-react-components";
import DestinationListPanel from "../components/DestinationListPanel";
import KeywordsListPanel from "../components/KeywordListPanel";
import MessagesListPanel from "../components/MessageListPanel";
import ObjectivesListPanel from "../components/ObjectiveListPanel";
import React from "react";
import TacticListPanel from "../components/TacticListPanel";


export default class CampaignForm extends React.Component {

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
				<form onSubmit={this.handleSubmit.bind(this)}>
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
					                    disabled={false}/>
					<TextFormGroup label="Tags" id="tags"/>
					<button type="submit" class="btn btn-success">Save</button>
					<AssetListPanel assets={assets}/>
					<BudgetPanel/>
					<ContentListPanel/>
					<DestinationListPanel/>
					<KeywordsListPanel/>
					<MessagesListPanel/>
					<ObjectivesListPanel/>
					<TacticListPanel/>
				</form>
		);
	}
}