"use strict";
import axios from "axios";
import dispatcher from "../Dispatcher";
import {ChannelEventNames} from "../constants";
import UserStore from "../stores/UserStore";

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

export function updateChannel(channel) {
	axios.put('/api/' + UserStore.id + '/channels/' + channel._id, channel)
			.then((response) => {
				dispatcher.dispatch({
					type: ChannelEventNames.UPDATE_CHANNEL,
					channel
				})
			})
			.catch((error) => dispatcher.dispatch({type: ChannelEventNames.UDPATE_CHANNEL_ERROR, error}));

}

export function loadChannels() {
	// TODO figure out how the waitfor is supposed to work.
	// console.log("dispatcher: ", dispatcher);
	// dispatcher.dispatch({
	// 	type: ChannelEventNames.FETCHING_CHANNEL_BEGIN
	// });
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
