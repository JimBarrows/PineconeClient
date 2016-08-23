'use strict';
import {EventEmitter} from "events";
import dispatcher from "../Dispatcher";
import {CampaignEvent} from "../constants";

class CampaignStore extends EventEmitter {
	constructor() {
		super();
		this._campaigns = [];
		this._error     = "";
	}

	get campaigns() {
		return this._campaigns;
	}

	get error() {
		return this._error
	}

	handleActions(action) {
		switch (action.type) {
			case CampaignEvent.CREATE_SUCCESS:
				this._campaigns = action.campaign;
				this.emit(CampaignEvent.CREATE_SUCCESS);
				break;
			case CampaignEvent.CREATE_FAILURE:
				this._error = action.error;
				this.emit(CampaignEvent.CREATE_FAILURE);
				break;
		}
	}
}


const store        = new CampaignStore();
export const token = dispatcher.register(store.handleActions.bind(store));
export default store;