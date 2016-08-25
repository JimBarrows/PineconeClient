import AssetListPanel from "../components/AssetListPanel";
import {deleteAsset, saveAsset} from "../actions/AccountActions";
import DestinationListPanel from "../components/DestinationListPanel";
import KeywordsListPanel from "../components/KeywordListPanel";
import MessageListPanel from "../components/MessageListPanel";
import {PageHeader} from "bootstrap-react-components";
import React from "react";
import TacticListPanel from "../components/TacticListPanel";
import {UserEventNames} from "../constants";
import UserStore from "../stores/UserStore";


export default class Settings extends React.Component {

	constructor(props) {
		super(props);
		this.updateUser = this.updateUser.bind(this);

		this.state = {
			username: "",
			assets: []
		}
	}

	componentWillMount() {
		UserStore.on(UserEventNames.REGISTER_USER_FAILURE, this.updateUser);
		UserStore.on(UserEventNames.REGISTER_USER_SUCCESS, this.updateUser);
		UserStore.on(UserEventNames.UPDATE_ACCOUNT, this.updateUser);
		UserStore.on(UserEventNames.UPDATE_ACCOUNT_FAILURE, this.updateUser);
		UserStore.on(UserEventNames.USER_LOGGED_IN, this.updateUser);
		UserStore.on(UserEventNames.USER_LOGGED_OUT, this.updateUser);
		UserStore.on(UserEventNames.USER_LOGIN_FAILURE, this.updateUser);
		UserStore.on(UserEventNames.USER_LOGOUT_FAILURE, this.updateUser);
		this.setState({
			username: UserStore.user(),
			assets: UserStore.assets()
		});
	}

	componentWillUnmount() {
		UserStore.removeListener(UserEventNames.REGISTER_USER_FAILURE, this.updateUser);
		UserStore.removeListener(UserEventNames.REGISTER_USER_SUCCESS, this.updateUser);
		UserStore.removeListener(UserEventNames.UPDATE_ACCOUNT, this.updateUser);
		UserStore.removeListener(UserEventNames.UPDATE_ACCOUNT_FAILURE, this.updateUser);
		UserStore.removeListener(UserEventNames.USER_LOGGED_IN, this.updateUser);
		UserStore.removeListener(UserEventNames.USER_LOGGED_OUT, this.updateUser);
		UserStore.removeListener(UserEventNames.USER_LOGIN_FAILURE, this.updateUser);
		UserStore.removeListener(UserEventNames.USER_LOGOUT_FAILURE, this.updateUser);
	}

	updateUser() {
		this.setState({
			username: UserStore.user(),
			assets: UserStore.assets()
		});
	}

	render() {
		return (
				<div>
					<PageHeader id="settings">
						<h1>Settings</h1>
					</PageHeader>
					<AssetListPanel assets={this.state.assets} deleteAsset={deleteAsset} saveAsset={saveAsset}/>
					<DestinationListPanel/>
					<KeywordsListPanel/>
					<MessageListPanel id="settingsMessages"/>
					<TacticListPanel/>
				</div>
		);
	}
}
