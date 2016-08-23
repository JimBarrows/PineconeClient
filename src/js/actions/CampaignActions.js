/**
 * Created by JimBarrows on 8/23/16.
 */
'use strict';
import axios from "axios";
import dispatcher from "../Dispatcher";
import {CampaignEvent} from "../constants";

export function create(campaign) {
	axios.post("/campaigns", campaign)
			.then((response)=> dispatcher.dispatch({
				type: CampaignEvent.CREATE_SUCCESS,
				campaign: response.data
			}))
			.catch((error) => dispatcher.dispatch({
				type: CampaignEvent.CREATE_FAILURE,
				error
			}));
}