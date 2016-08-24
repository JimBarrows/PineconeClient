/**
 * Created by JimBarrows on 8/23/16.
 */
'use strict';
import axios from "axios";
import dispatcher from "../Dispatcher";
import {CampaignEvent} from "../constants";

export function create(campaign) {
	axios.post("/api/campaigns", campaign)
			.then((response)=> dispatcher.dispatch({
				type: CampaignEvent.CREATE_SUCCESS,
				campaign: response.data
			}))
			.catch((error) => dispatcher.dispatch({
				type: CampaignEvent.CREATE_FAILURE,
				error
			}));
}

export function findById(id) {
	let campaign = CampaignListStore.findById(id);
	if (campaign) {
		dispatcher.dispatch({
			type: CampaignEvent.LOAD_CAMPAIGN_SUCCESS,
			campaign
		});
	} else {
		dispatcher.dispatch({
			type: CampaignEvent.LOAD_CAMPAIGN_FAILURE,
			error: {id}
		});
	}
}

export function load() {
	console.log("CampaignActions.load");
	axios.get("/api/campaigns")
			.then((response)=>dispatcher.dispatch({type: CampaignEvent.LOAD_LIST_SUCCESS, campaigns: response.data}))
			.catch((error) => dispatcher.dispatch({type: CampaignEvent.LOAD_LIST_FAILURE, error: error}));
}