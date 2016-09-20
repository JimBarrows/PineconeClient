'use strict';
import {BlogPostEventNames, CampaignEvent} from "../constants";
import dispatcher from "../Dispatcher";
import {EventEmitter} from "events";
import moment from "moment";

class CampaignStore extends EventEmitter {

	get assets() {
		return this._assets
	}

	get blogPosts() {
		return this._blogPosts
	}

	get budgetLineItems() {
		return this._budgetLineItems
	}

	get campaign() {
		return {
			assets: this.assets,
			blogPosts: this.blogPosts,
			budgetLineItems: this.budgetLineItems,
			destinations: this.destinations,
			effectiveFrom: this.effectiveFrom,
			effectiveThru: this.effectiveThru,
			facebookAccounts: this.facebookAccounts,
			_id: this._id,
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

	constructor() {
		super();
		this.initialize();
	}

	copyFrom(action) {
		this._assets            = action.campaign.assets;
		this._blogPosts         = action.campaign.blogPosts;
		this._budgetLineItems   = action.campaign.budgetLineItems;
		this._destinations      = action.campaign.destinations;
		this._effectiveFrom     = action.campaign.effectiveFrom;
		this._effectiveThru     = action.campaign.effectiveThru;
		this._facebookAccounts  = action.campaign.facebookAccounts;
		this.__id               = action.campaign._id;
		this._keywords          = action.campaign.keywords;
		this._messages          = action.campaign.messages;
		this._name              = action.campaign.name;
		this._objectives        = action.campaign.objectives;
		this._owner             = action.campaign.owner;
		this._tags              = action.campaign.tags;
		this._twitterAccounts   = action.campaign.twitterAccounts;
		this._wordPressAccounts = action.campaign.wordPressAccounts;
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

	findBlogPostById(id) {
		let filteredList = this._blogPosts.filter((bp) => bp._id === id);
		if (filteredList) {
			return filteredList[0];
		} else {
			return null;
		}
	}

	handleActions(action) {
		switch (action.type) {
			case BlogPostEventNames.BLOG_POST_CREATE_SUCCESS:
				this.copyFrom(action);
				this.emit(CampaignEvent.UPDATE_SUCCESS);
				break;
			case BlogPostEventNames.BLOG_POST_UPDATE_SUCCESS:
				this.copyFrom(action);
				this.emit(CampaignEvent.UPDATE_SUCCESS);
				break;
			case CampaignEvent.CLEAR:
				this.initialize();
				this.emit(CampaignEvent.LOAD_CAMPAIGN_SUCCESS);
				break;
			case CampaignEvent.LOAD_CAMPAIGN_SUCCESS:
				this.copyFrom(action);
				this.emit(CampaignEvent.LOAD_CAMPAIGN_SUCCESS);
				break;
			case CampaignEvent.UPDATE_SUCCESS:
				this.copyFrom(action);
				this.emit(CampaignEvent.UPDATE_SUCCESS);
				break;
		}
	}

	get _id() {
		return this.__id
	}

	initialize() {
		this._assets            = [];
		this._blogPosts         = [];
		this._budgetLineItems   = [];
		this._destinations      = [];
		this._effectiveFrom     = moment();
		this._effectiveThru     = null;
		this._facebookAccounts  = [];
		this.__id               = null;
		this._keywords          = [];
		this._messages          = [];
		this._name              = "";
		this._objectives        = [];
		this._owner             = null;
		this._tags              = [];
		this._twitterAccounts   = [];
		this._wordPressAccounts = []
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
}


const store        = new CampaignStore;
export const token = dispatcher.register(store.handleActions.bind(store));
export default store;