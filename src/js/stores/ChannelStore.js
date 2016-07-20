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
			case ChannelEventNames.CREATE_CHANNEL:
				this.channels.push(action.newChannel);
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
				let updateChannel   = action.channel;
				let originalChannel = this.findById(updateChannel.id);
				originalChannel     = updateChannel;
				this.emit(ChannelStoreEventName.CHANGE);
				break;
			case ChannelEventNames.UPDATE_CHANNEL_ERROR:
				this.emit(ChannelStoreEventName.ERROR, action.error);
				break;
		}
	}
}


const channelStore             = new ChannelStore;
export const channelStoreToken = dispatcher.register(channelStore.handleActions.bind(channelStore));
export default channelStore;

