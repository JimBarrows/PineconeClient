'use strict';
import React from "react";
import PageHeader from "bootstrap-react-components";
import TextFormGroup from "bootstrap-react-components";
import FormGroup from "bootstrap-react-components";
import DateRangeFormGroup from "bootstrap-react-components";
import ObjectivesListPanel from "../components/ObjectiveListPanel";
import MessagesListPanel from "../components/MessageListPanel";
import TacticListPanel from "../components/TacticListPanel";
import BudgetPanel from "../components/BudgetPanel";
import KeywordsListPanel from "../components/KeywordListPanel";
import DestinationListPanel from "../components/DestinationListPanel";
import AssetListPanel from "../components/AssetListPanel";
import ContentListPanel from "../components/ContentListPanel";

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
					<PageHeader title="Define Campaign"/>
					<TextFormGroup label="Name" name="name" onChange={this.fieldChange.bind(this)} error="" value=""
					               placeholder="Christmas Campaign" disabled={false}/>
					<DateRangeFormGroup label="Effective" name="campaignDates" onChange={this.fieldChange.bind(this)} error=""
					                    value=""
					                    disabled={false}/>
					<FormGroup label="Tags" name="tags">
						<input type="text" class="form-control" placeholder="Tags"/>
					</FormGroup>
					<ObjectivesListPanel/>
					<MessagesListPanel/>
					<TacticListPanel/>
					<BudgetPanel/>
					<KeywordsListPanel/>
					<DestinationListPanel/>
					<AssetListPanel/>
					<ContentListPanel/>
				</form>
		);
	}
}