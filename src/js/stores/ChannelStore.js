import {EventEmitter} from "events";
import dispatcher from "../Dispatcher";
import {ChannelStoreEventName, ChannelEventNames} from "../constants";

class ChannelStore extends EventEmitter {
	constructor() {
		super();
		this.channels       = [];
		this.currentChannel = {};
	}

	getAll() {
		return this.channels;
	}

	current() {
		return this.currentChannel;
	}

	findById(id) {
		let found = this.channels.filter((channel) => channel._id === id);
		return found[0];
	}

	handleActions(action) {
		switch (action.type) {
			case ChannelEventNames.ADD_FACEBOOK_DESTINATION:
				this.current().facebookDestinations.push(action.facebookDestination);
				this.emit(ChannelStoreEventName.CURRENT_CHANNEL_CHANGE);
				break;
			case ChannelEventNames.CREATE_CHANNEL:
				this.channels.push(action.newChannel);
				this.currentChannel = {};
				this.emit(ChannelStoreEventName.CHANGE);
				break;
			case ChannelEventNames.CREATE_CHANNEL_ERROR:
				this.emit(ChannelStoreEventName.ERROR, action.error);
				break;
			case ChannelEventNames.DELETE_CHANNEL:
				this.channels = this.channels.filter((channel) => channel._id !== action.channel._id);
				this.emit(ChannelStoreEventName.CHANGE);
				break;
			case ChannelEventNames.DELETE_CHANNEL_ERROR:
				this.emit(ChannelStoreEventName.ERROR, action.error);
				break;
			case ChannelEventNames.DELETE_FACEBOOK_DESTINATION:
				let index = action.facebookDestination._id ? this.current().facebookDestinations.findIndex((fbd) => fbd._id === action.facebookDestination._id) : index;
				this.current().facebookDestinations.splice(index, 1);
				this.emit(ChannelStoreEventName.CURRENT_CHANNEL_CHANGE);
				break;
			case ChannelEventNames.EDIT_CHANNEL:
				this.currentChannel = action.channel;
				this.emit(ChannelStoreEventName.CURRENT_CHANNEL_CHANGE);
				break;
			case ChannelEventNames.FETCHING_CHANNELS_SUCCESS:
				this.channels = action.channels;
				this.emit(ChannelStoreEventName.CHANGE);
				break;
			case ChannelEventNames.NEW_CHANNEL:
				this.currentChannel = action.channel;
				this.emit(ChannelStoreEventName.CURRENT_CHANNEL_CHANGE);
				break;
			case ChannelEventNames.UPDATE_CHANNEL:
				console.log("ChannelStore.updateChannel: ", action);
				let updateChannel   = action.channel;
				let originalChannel = this.findById(updateChannel._id);
				console.log("ChannelStore.updateChannel before original: ", originalChannel);
				originalChannel.name                  = updateChannel.name;
				originalChannel.wordPressDestinations = updateChannel.wordPressDestinations;
				originalChannel.facebookDestinations  = updateChannel.facebookDestinations;
				console.log("ChannelStore.updateChannel after original: ", originalChannel);
				console.log("ChannelStore.updateChannel list: ", this.channels);
				this.currentChannel = {};

				this.emit(ChannelStoreEventName.CHANGE);
				break;
			case ChannelEventNames.UPDATE_CHANNEL_ERROR:
				this.emit(ChannelStoreEventName.ERROR, action.error);
				break;
			case ChannelEventNames.UPDATE_FACEBOOK_DESTINATION:
				let target    = (action.facebookDestination._id) ? this.current().facebookDestinations.find((fbd) => fbd._id === action.facebookDestination._id) : this.current().facebookDestinations[action.facebookDestination.index];
				target.name   = action.facebookDestination.name;
				target.pageId = action.facebookDestination.pageId;
				this.emit(ChannelStoreEventName.CURRENT_CHANNEL_CHANGE);
				break;
		}
	}
}


const channelStore             = new ChannelStore;
export const channelStoreToken = dispatcher.register(channelStore.handleActions.bind(channelStore));
export default channelStore;

