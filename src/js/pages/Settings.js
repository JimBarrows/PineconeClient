import React from "react";
import * as UserActions from "../actions/UserActions";
import PageHeader from "bootstrap-react-components/src/PageHeader.jsx";
import ChannelListPanel from "../components/ChannelListPanel";
import MessageListPanel from "../components/MessageListPanel";
import KeywordsListPanel from "../components/KeywordListPanel";
import DestinationListPanel from "../components/DestinationListPanel";
import AssetListPanel from "../components/AssetListPanel";


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
					<PageHeader title="Settings"/>
					<ChannelListPanel/>
					<MessageListPanel/>
					<KeywordsListPanel/>
					<DestinationListPanel/>
					<AssetListPanel/>
				</div>
		);
	}
}
