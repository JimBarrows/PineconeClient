'use strict';
import {EventEmitter} from "events";
import dispatcher from "../Dispatcher";
import {CampaignEvent} from "../constants";
import moment from "moment";

class CampaignStore extends EventEmitter {

	get assets() {
		return this._assets
	}

	get budgetLineItems() {
		return this._budgetLineItems
	}

	constructor() {
		super();
		this._assets            = [];
		this._budgetLineItems   = [];
		this._destinations      = [];
		this._effectiveFrom     = moment();
		this._effectiveThru     = null;
		this._facebookAccounts  = [];
		this._id                = null;
		this._keywords          = [];
		this._messages          = [];
		this._name              = null;
		this._objectives        = [];
		this._owner             = null;
		this._tags              = [];
		this._twitterAccounts   = [];
		this._wordPressAccounts = []
	}

	get campaign() {
		return {
			assets: this.assets,
			budgetLineItems: this.budgetLineItems,
			destinations: this.destinations,
			effectiveFrom: this.effectiveFrom,
			effectiveThru: this.effectiveThru,
			facebookAccounts: this.facebookAccounts,
			id: this.id,
			keywords: this.keywords,
			messages: this.messages,
			name: this.name,
			objectives: this.objectives,
			owner: this.owner,
			tags: this.tags,
			twitterAccounts: this.twitterAccounts,
			wordPressAccounts: this.wordPressAccounts
		}
	}

	get destinations() {
		return this._destinations
	}

	get effectiveFrom() {
		return this._effectiveFrom
	}

	get effectiveThru() {
		return this._effectiveThru
	}

	get facebookAccounts() {
		return this._facebookAccounts
	}

	get keywords() {
		return this._keywords
	}

	get messages() {
		return this._messages
	}

	get name() {
		return this._name
	}

	get objectives() {
		return this._objectives
	}

	get owner() {
		return this._owner
	}

	get tags() {
		return this._tags
	}

	get twitterAccounts() {
		return this._twitterAccounts
	}

	get wordPressAccounts() {
		return this._wordPressAccounts
	}

	handleActions(action) {
		switch (action.type) {
			case CampaignEvent.LOAD_CAMPAIGN_SUCCESS:
				this._assets            = action.campaign.assets;
				this._budgetLineItems   = action.campaign.budgetLineItems;
				this._destinations      = action.campaign.destinations;
				this._effectiveFrom     = action.campaign.effectiveFrom;
				this._effectiveThru     = action.campaign.effectiveThru;
				this._facebookAccounts  = action.campaign.facebookAccounts;
				this._id                = action.campaign.id;
				this._keywords          = action.campaign.keywords;
				this._messages          = action.campaign.messages;
				this._name              = action.campaign.name;
				this._objectives        = action.campaign.objectives;
				this._owner             = action.campaign.owner;
				this._tags              = action.campaign.tags;
				this._twitterAccounts   = action.campaign.twitterAccounts;
				this._wordPressAccounts = action.campaign.wordPressAccounts;
				this.emit(CampaignEvent.LOAD_CAMPAIGN_SUCCESS);
				break;
		}
	}
}


const store        = new CampaignStore;
export const token = dispatcher.register(store.handleActions.bind(store));
export default store;