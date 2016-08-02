"use strict";
import axios from "axios";
import dispatcher from "../Dispatcher";
import {ChannelEventNames} from "../constants";
import UserStore from "../stores/UserStore";

export function addFacebookDestination() {
	dispatcher.dispatch({
		type: ChannelEventNames.ADD_FACEBOOK_DESTINATION,
		facebookDestination: {
			name: "",
			pageId: ""
		}
	});
}

export function addTwitterDestination() {
	dispatcher.dispatch({
		type: ChannelEventNames.ADD_TWITTER_DESTINATION,
		twitterDestination: {
			name: '',
			oauth_token: "",
			oauth_verifier: "",
			access_token: ""
		}
	})
}
export function createChannel(channel) {
	axios.post('/api/' + UserStore.id + '/channels', channel)
			.then((response) => {
				dispatcher.dispatch({
					type: ChannelEventNames.CREATE_CHANNEL,
					newChannel: response.data
				});
			})
			.catch((error) => {
				dispatcher.dispatch({
					type: ChannelEventNames.CREATE_CHANNEL_ERROR,
					error
				})
			});
}

export function deleteChannel(channel) {
	axios.delete('/api/' + UserStore.currentId() + '/channels/' + channel._id)
			.then((resonse) => {
				dispatcher.dispatch({
					type: ChannelEventNames.DELETE_CHANNEL,
					channel
				})
			})
}

export function deleteFacebookDestination(facebookDestination) {
	dispatcher.dispatch({
		type: ChannelEventNames.DELETE_FACEBOOK_DESTINATION,
		facebookDestination
	})
}

export function deleteTwitterDestination(twitterDestination) {
	dispatcher.dispatch({
		type: ChannelEventNames.DELETE_TWITTER_DESTINATION,
		twitterDestination
	})
}

export function editChannel(channel) {
	dispatcher.dispatch({
		type: ChannelEventNames.EDIT_CHANNEL,
		channel
	})
}

export function loadChannels() {
	axios.get('/api/' + UserStore.id + '/channels')
			.then(function (response) {
				dispatcher.dispatch({
					type: ChannelEventNames.FETCHING_CHANNELS_SUCCESS,
					channels: response.data
				})
			})
			.catch(function (error) {
				if (error.status > 399 && error.status < 500) {
					dispatcher.dispatch({
						type: ChannelEventNames.FETCHING_CHANNELS_FAILURE,
						message: "Programmer error: " + error.statusText
					})
				} else {
					dispatcher.dispatch({
						type: ChannelEventNames.FETCHING_CHANNELS_FAILURE,
						message: error
					})
				}
			})
}

export function newChannel() {
	dispatcher.dispatch({
		type: ChannelEventNames.NEW_CHANNEL,
		channel: {
			name: "New Channel",
			wordPressDestinations: [],
			facebookDestinations: [],
			twitterDestinations: []
		}
	});
}

export function updateChannel(channel) {
	console.log("updateChannel( ", channel, ")");
	axios.put('/api/' + UserStore.id + '/channels/' + channel._id, channel)
			.then((response) => {
				dispatcher.dispatch({
					type: ChannelEventNames.UPDATE_CHANNEL,
					channel
				})
			})
			.catch((error) => {
				console.log("Couldn't update channel because ", error);
				dispatcher.dispatch({type: ChannelEventNames.UDPATE_CHANNEL_ERROR, error})
			});

}

export function updateFacebookDestination(facebookDestination) {

	axios.get('/api/user/pageAcccessToken/' + facebookDestination.pageId)
			.then((response)=> {
				facebookDestination.accessToken = response.data.accessToken;
				dispatcher.dispatch({
					type: ChannelEventNames.UPDATE_FACEBOOK_DESTINATION,
					facebookDestination
				});
			})
			.catch((error) => {
				dispatcher.dispatch({
					type: ChannelEventNames.UPDATE_FACEBOOK_DESTINATION_ERROR,
					facebookDestination,
					error
				});
			});
}

export function updateTwitterDestination(twitterDestination) {
	console.log("updateTwitterDestination( ", twitterDestination, ")");
	dispatcher.dispatch({
		type: ChannelEventNames.UPDATE_TWITTER_DESTINATION,
		twitterDestination
	});
}




