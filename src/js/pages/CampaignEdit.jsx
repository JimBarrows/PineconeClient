'use strict';
import React from "react";
import PageHeader from "bootstrap-react-components/src/PageHeader";
import TextFormGroup from "bootstrap-react-components/src/TextFormGroup";
import FormGroup from "bootstrap-react-components/src/FormGroup";
import DateRangeFormGroup from "bootstrap-react-components/src/DateRangeFormGroup";
import ObjectivesListPanel from "../components/ObjectiveListPanel";
import MessagesListPanel from "../components/MessageListPanel";
import ChannelsListPanel from "../components/ChannelListPanel";
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
					<ChannelsListPanel/>
					<BudgetPanel/>
					<KeywordsListPanel/>
					<DestinationListPanel/>
					<AssetListPanel/>
					<ContentListPanel/>
				</form>
		);
	}
}