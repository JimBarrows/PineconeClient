import {EventEmitter} from "events";
import dispatcher from "../Dispatcher";
import {UserEventNames} from "../constants";

class UserStore extends EventEmitter {
	constructor() {
		super();
		this._assets            = [];
		this._destinations      = [];
		this._facebookAccounts  = [];
		this._id                = null;
		this._keywords          = [];
		this._messages          = [];
		this._twitterAccounts   = [];
		this._username          = null;
		this._wordPressAccounts = [];
	}


	addActionContent(content) {
		this._assets   = content.assets;
		this._id       = content._id;
		this._username = content.username;
	}

	invalidate() {
		this._assets   = [];
		this._id       = 0;
		this._username = "";
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

	user() {
		return this._username;
	}

	id() {
		return this._id;
	}

	assets() {
		return this._assets
	}

}
const userStore             = new UserStore;
export const userStoreToken = dispatcher.register(userStore.handleActions.bind(userStore));
export default userStore;