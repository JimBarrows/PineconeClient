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
			case ChannelEventNames.ADD_TWITTER_DESTINATION:
				this.current().twitterDestinations.push(action.twitterDestination);
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
			case ChannelEventNames.DELETE_TWITTER_DESTINATION:
				let twitterDestinationIndex = action.twitterDestination._id ? this.current().twitterDestinations.findIndex((twitterDestination) => twitterDestination._id === action.twitterDestination._id) : index;
				this.current().twitterDestinations.splice(twitterDestinationIndex, 1);
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
				let updateChannel                     = action.channel;
				let originalChannel                   = this.findById(updateChannel._id);
				originalChannel.name                  = updateChannel.name;
				originalChannel.wordPressDestinations = updateChannel.wordPressDestinations;
				originalChannel.facebookDestinations  = updateChannel.facebookDestinations;
				originalChannel.twitterDestinations   = updateChannel.twitterDestinations;
				this.currentChannel                   = {};
				this.emit(ChannelStoreEventName.CHANGE);
				break;
			case ChannelEventNames.UPDATE_CHANNEL_ERROR:
				this.emit(ChannelStoreEventName.ERROR, action.error);
				break;
			case ChannelEventNames.UPDATE_FACEBOOK_DESTINATION:
			case ChannelEventNames.UPDATE_FACEBOOK_DESTINATION_ERROR:
				let targetFB         = (action.facebookDestination._id) ? this.current().facebookDestinations.find((fbd) => fbd._id === action.facebookDestination._id) : this.current().facebookDestinations[action.facebookDestination.index];
				targetFB.name        = action.facebookDestination.name;
				targetFB.pageId      = action.facebookDestination.pageId;
				targetFB.accessToken = action.facebookDestination.accessToken;
				if (action.type === ChannelEventNames) {
					//TODO don't ignore this error
					console.log("Error setting facebook destination: ", action.error);
				}
				this.emit(ChannelStoreEventName.CURRENT_CHANNEL_CHANGE);
				break;
				break;
			case ChannelEventNames.UPDATE_TWITTER_DESTINATION:
				let targetTwitter           = (action.twitterDestination._id) ? this.current().twitterDestinations.find((twitterDestination) => twitterDestination._id === action.twitterDestination._id) : this.current().twitterDestinations[action.twitterDestination.index];
				targetTwitter.name          = action.twitterDestination.name;
				targetTwitter.oauthToken    = action.twitterDestination.oauthToken;
				targetTwitter.oauthVerifier = action.twitterDestination.oauthVerifier;
				this.emit(ChannelStoreEventName.CURRENT_CHANNEL_CHANGE);
				break;
		}
	}
}


const channelStore             = new ChannelStore;
export const channelStoreToken = dispatcher.register(channelStore.handleActions.bind(channelStore));
export default channelStore;

