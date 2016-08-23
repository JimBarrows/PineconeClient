'use strict';
import AssetListPanel from "../components/AssetListPanel";
import BudgetPanel from "../components/BudgetPanel";
import ContentListPanel from "../components/ContentListPanel";
import {DateRangFormGroup, PageHeader, TextFormGroup} from "bootstrap-react-components";
import DestinationListPanel from "../components/DestinationListPanel";
import KeywordsListPanel from "../components/KeywordListPanel";
import MessagesListPanel from "../components/MessageListPanel";
import ObjectivesListPanel from "../components/ObjectiveListPanel";
import React from "react";
import TacticListPanel from "../components/TacticListPanel";

export default class CampaignForm extends React.Component {

	fieldChange(event) {

	}

	edit() {

	}

	save() {

	}

	remove() {

	}

	add() {

	}

	render() {
		return (
				<form >
					<PageHeader>
						<h1>Define Campaign</h1>
					</PageHeader>
					<TextFormGroup label="Name" name="name" onChange={this.fieldChange.bind(this)} error="" value=""
					               placeholder="Christmas Campaign" disabled={false}/>
					<DateRangFormGroup label="Effective" name="campaignDates" onChange={this.fieldChange.bind(this)} error=""
					                   value=""
					                   disabled={false}/>
					<TextFormGroup label="Tags" name="tags">
						<input type="text" class="form-control" placeholder="Tags"/>
					</TextFormGroup>
					<AssetListPanel/>
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