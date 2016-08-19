import AssetListPanel from "../components/AssetListPanel";
import DestinationListPanel from "../components/DestinationListPanel";
import KeywordsListPanel from "../components/KeywordListPanel";
import MessageListPanel from "../components/MessageListPanel";
import {PageHeader} from "bootstrap-react-components";
import React from "react";
import TacticListPanel from "../components/TacticListPanel";
import * as UserActions from "../actions/UserActions";


export default class Settings extends React.Component {

	addFacebookId(name, email, accessToken, expiresIn, signedRequest, userId) {
		UserActions.addFacebookUserId(accessToken, email, expiresIn, name, signedRequest, userId);
	}

	addTwitterAccount() {
		UserActions.addTwitterAccount();
	}

	edit() {
		console.log("Edit");
	}

	save() {
		console.log("Save");
	}

	remove() {
		console.log("remove");
	}

	render() {
		const scope = {scope: 'publish_pages, email'};
		const appId = "1236802509686356";
		return (
				<div>
					<PageHeader>
						<h1>Settings</h1>
					</PageHeader>
					<TacticListPanel/>
					<MessageListPanel/>
					<KeywordsListPanel/>
					<DestinationListPanel/>
					<AssetListPanel/>
				</div>
		);
	}
}
