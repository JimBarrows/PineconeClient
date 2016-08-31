import {EventEmitter} from "events";
import dispatcher from "../Dispatcher";
import {UserEventNames} from "../constants";

class UserStore extends EventEmitter {

	assets() {
		return this._assets
	}

	addActionContent(content) {
		this._assets            = content.assets;
		this._destinations      = content.destinations;
		this._id                = content._id;
		this._keywords          = content.keywords;
		this._messages          = content.messages;
		this._username          = content.username;
		this._wordPressAccounts = content.wordpressAccounts;
	}

	constructor() {
		super();
		this.invalidate();
	}

	get destinations() {
		return this._destinations
	}

	handleActions(action) {
		switch (action.type) {
			case UserEventNames.USER_LOGGED_IN :
				this.addActionContent(action.content);
				this.emit(UserEventNames.USER_LOGGED_IN);
				break;
			case UserEventNames.REGISTER_USER_SUCCESS :
				this.addActionContent(action.content);
				this.emit(UserEventNames.REGISTER_USER_SUCCESS);
				break;
			case UserEventNames.REGISTER_USER_FAILURE :
				this.invalidate();
				this.emit(UserEventNames.REGISTER_USER_FAILURE, action.error);
				break;
			case UserEventNames.UPDATE_ACCOUNT :
				this.addActionContent(action.account);
				this.emit(UserEventNames.UPDATE_ACCOUNT);
				break;
			case UserEventNames.UPDATE_ACCOUNT_FAILURE :
				this.error = action.error;
				this.emit(UserEventNames.UPDATE_ACCOUNT_FAILURE);
				break;
			case UserEventNames.USER_LOGIN_FAILURE :
				this.invalidate();
				this.emit(UserEventNames.USER_LOGIN_FAILURE, action.username, action.error);
				break;
			case UserEventNames.USER_LOGOUT_FAILURE :
				this.emit(UserEventNames.USER_LOGOUT_FAILURE);
				break;
			case UserEventNames.USER_LOGGED_OUT :
				this.invalidate();
				this.emit(UserEventNames.USER_LOGGED_OUT);
				break;
		}
	}

	id() {
		return this._id;
	}

	invalidate() {
		this._assets            = [];
		this._destinations      = [];
		this.error              = "";
		this._facebookAccounts  = [];
		this._id                = null;
		this._keywords          = [];
		this._messages          = [];
		this._twitterAccounts   = [];
		this._username          = null;
		this._wordPressAccounts = [];
	}

	get keywords() {
		return this._keywords
	}

	get messages() {
		return this._messages
	}

	user() {
		return this._username;
	}

	get wordpressAccounts() {
		return this._wordPressAccounts;
	}

}
const userStore             = new UserStore;
export const userStoreToken = dispatcher.register(userStore.handleActions.bind(userStore));
export default userStore;