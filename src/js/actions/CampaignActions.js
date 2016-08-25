/**
 * Created by JimBarrows on 8/23/16.
 */
'use strict';
import axios from "axios";
import dispatcher from "../Dispatcher";
import {CampaignEvent} from "../constants";
import CampaignListStore from "../stores/CampaignListStore";
import moment from "moment";

export function clear() {
	dispatcher.dispatch({
		type: CampaignEvent.CLEAR
	})
}

export function create(campaign) {
	console.log("create campaign: ", campaign);
	axios.post("/api/campaigns", campaign)
			.then((response)=> dispatcher.dispatch({
				type: CampaignEvent.CREATE_SUCCESS,
				campaign: jsonToCampaign(response.data)
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

function jsonToCampaign(data) {
	let campaign = {
		...data,
		effectiveFrom: moment(data.effectiveFrom),
		effectiveThru: moment(data.effectiveThru)
	};
	return campaign;
}

export function load() {
	axios.get("/api/campaigns")
			.then((response)=>dispatcher.dispatch({
				type: CampaignEvent.LOAD_LIST_SUCCESS,
				campaigns: response.data.map((d) => jsonToCampaign(d))
			}))
			.catch((error) => dispatcher.dispatch({type: CampaignEvent.LOAD_LIST_FAILURE, error: error}));
}

export function remove(campaign) {
	axios.delete("/api/campaign/" + campaign._id)
			.then((response) => dispatcher.dispatch({
				type: CampaignEvent.REMOVE_CAMPAIGN_SUCCESS,
				campaign
			}))
			.catch((error) => dispatcher.dispatch({
				type: CampaignEvent.REMOVE_CAMPAIGN_FAILURE,
				error
			}));
}

export function update(campaign) {
	axios.put("/api/campaign/" + campaign._id, campaign)
			.then((response)=> dispatcher.dispatch({
				type: CampaignEvent.UPDATE_SUCCESS,
				campaign
			}))
			.catch((error) => dispatcher.dispatch({
				type: CampaignEvent.UDPATE_FAILURE,
				error
			}));
}

