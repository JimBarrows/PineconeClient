import {EventEmitter} from "events";
import dispatcher from "../Dispatcher";
import {UserEventNames} from "../constants";

class UserStore extends EventEmitter {
	constructor() {
		super();
		this.username       = null;
		this._id            = null;
		this.facebookUserId = null;
	}


	handleActions(action) {
		switch (action.type) {
			case UserEventNames.USER_FACEBOOK_ID_ADDED:
				this.facebookUserId = action.facebookUserId;
				this.emit(UserEventNames.USER_FACEBOOK_ID_ADDED);
				break;
			case UserEventNames.USER_LOGGED_IN :
				this.username       = action.content.username;
				this._id            = action.content._id;
				this.facebookUserId = action.content.facebookUserId;
				this.emit(UserEventNames.USER_LOGGED_IN);
				break;
			case UserEventNames.REGISTER_USER_SUCCESS :
				this.username       = action.content.username;
				this._id            = action.content._id;
				this.facebookUserId = action.content.facebookUserId;
				this.emit(UserEventNames.REGISTER_USER_SUCCESS);
				break;
			case UserEventNames.REGISTER_USER_FAILURE :
				this.emit(UserEventNames.REGISTER_USER_FAILURE, action.error);
				break;
			case UserEventNames.USER_LOGIN_FAILURE :
				this.username = null;
				this.id       = null;
				this.emit(UserEventNames.USER_LOGIN_FAILURE, action.username, action.error);
				break;
			case UserEventNames.USER_LOGOUT_FAILURE :
				this.username = null;
				this.id       = null;
				this.emit(UserEventNames.USER_LOGOUT_FAILURE);
				break;
			case UserEventNames.USER_LOGGED_OUT :
				this.username = null;
				this.id       = null;
				this.emit(UserEventNames.USER_LOGGED_OUT);
				break;
		}
	}

	user() {
		return this.username;
	}

	currentId() {
		return this._id;
	}

}
const userStore             = new UserStore;
export const userStoreToken = dispatcher.register(userStore.handleActions.bind(userStore));
export default userStore;