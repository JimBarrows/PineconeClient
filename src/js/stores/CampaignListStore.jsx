'use strict';
import {EventEmitter} from "events";
import dispatcher from "../Dispatcher";
import {CampaignEvent} from "../constants";

class CampaignListStore extends EventEmitter {
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

	findById(id) {
		return this.campaigns.filter((campaign) => campaign._id === id)[0];
	}

	handleActions(action) {
		switch (action.type) {
			case CampaignEvent.CREATE_SUCCESS:
				this._campaigns.push(action.campaign);
				this.emit(CampaignEvent.CREATE_SUCCESS);
				break;
			case CampaignEvent.CREATE_FAILURE:
				this._error = action.error;
				this.emit(CampaignEvent.CREATE_FAILURE);
				break;
			case CampaignEvent.LOAD_LIST_SUCCESS:
				this._campaigns = action.campaigns;
				this.emit(CampaignEvent.LOAD_LIST_SUCCESS);
				break;
			case CampaignEvent.LOAD_LIST_FAILURE:
				this._error = action.error;
				this.emit(CampaignEvent.LOAD_LIST_FAILURE);
				break;
		}
	}
}


const store        = new CampaignListStore();
export const token = dispatcher.register(store.handleActions.bind(store));
export default store;