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
				this.setState({
					effectiveFrom: event.target.value
				});
				break;
			case 'effectiveThru':
				this.setState({
					effectiveThru: event.target.value
				});
				break;
			case'name':
				this.setState({
					name: event.target.value
				});
				break;
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onSubmit({
			assets: this.state.assets,
			budgetLineItems: this.state.budgetLineItems,
			destinations: this.state.destinations,
			effectiveFrom: this.state.effectiveFrom,
			effectiveThru: this.state.effectiveThru,
			facebookAccounts: this.state.facebookAccounts,
			keywords: this.state.keywords,
			messages: this.state.messages,
			name: this.state.name,
			objectives: this.state.objectives,
			owner: this.state.owner,
			tags: this.state.tags,
			twitterAccounts: this.state.twitterAccounts,
			wordPressAccounts: this.state.wordPressAccounts
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