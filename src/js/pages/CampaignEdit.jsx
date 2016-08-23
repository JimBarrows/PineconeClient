'use strict';
import AssetListPanel from "../components/AssetListPanel";
import BudgetPanel from "../components/BudgetPanel";
import ContentListPanel from "../components/ContentListPanel";
import {DateRangeFormGroup, PageHeader, TextFormGroup} from "bootstrap-react-components";
import DestinationListPanel from "../components/DestinationListPanel";
import KeywordsListPanel from "../components/KeywordListPanel";
import moment from "moment";
import MessagesListPanel from "../components/MessageListPanel";
import ObjectivesListPanel from "../components/ObjectiveListPanel";
import React from "react";
import TacticListPanel from "../components/TacticListPanel";

export default class CampaignForm extends React.Component {

	fieldChange(event) {

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
		    } = this.props.campaign || {
			assets: [],
			budgetLineItems: [],
			destinations: [],
			effectiveFrom: moment(),
			effectiveThru: null,
			facebookAccounts: [],
			keywords: [],
			messages: [],
			name: "",
			objectives: [],
			owner: null,
			tags: [],
			twitterAccounts: [],
			wordPressAccounts: []
		};
		return (
				<form >
					<PageHeader>
						<h1>Define Campaign</h1>
					</PageHeader>
					<TextFormGroup label="Name"
					               id="name"
					               onChange={this.fieldChange.bind(this)}
					               error=""
					               value={name}
					               placeholder="Christmas Campaign"
					               disabled={false}/>
					<DateRangeFormGroup label="Effective"
					                    id="campaignDates"
					                    onChange={this.fieldChange.bind(this)}
					                    error=""
					                    fromValue={effectiveFrom}
					                    thruValue={effectiveThru}
					                    disabled={false}/>
					<TextFormGroup label="Tags" id="tags"/>
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