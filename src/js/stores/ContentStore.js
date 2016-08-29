'use strict';
import {EventEmitter} from "events";
import {ContentEventNames} from "../constants";
import dispatcher from "../Dispatcher";

class ContentStore extends EventEmitter {
	constructor() {
		super();
		this.content = [];
		this._error  = "";
	}

	all() {
		return this.content
	};

	findById(id) {
		let found = this.content.filter((piece) => piece._id === id);
		return found[0];
	}

	error() {
		return this._error;
	}

	handleActions(action) {
		switch (action.type) {
			case ContentEventNames.CONTENT_FETCH_SUCCESS:
				this.content = action.content;
				this.emit(ContentEventNames.CONTENT_FETCH_SUCCESS);
				break;
			case ContentEventNames.CONTENT_FETCH_FAILURE:
				this.content = [];
				this._error  = action.message;
				this.emit(ContentEventNames.CONTENT_FETCH_FAILURE);
				break;
			case ContentEventNames.CONTENT_CREATE_SUCCESS:
				this.content.push(action.content);
				this.emit(ContentEventNames.CONTENT_CREATE_SUCCESS);
				break;
			case ContentEventNames.CONTENT_CREATE_FAILURE:
				this.error = action.message;
				this.emit(ContentEventNames.CONTENT_CREATE_FAILURE);
				break;
			case ContentEventNames.CONTENT_DELETE_SUCCESS:
				this.content = this.content.filter((piece)=>piece._id !== action.content._id);
				this.emit(ContentEventNames.CONTENT_DELETE_SUCCESS);
				break;
			case ContentEventNames.CONTENT_DELETE_FAILURE:
				this.error = action.message;
				this.emit(ContentEventNames.CONTENT_DELETE_FAILURE);
				break;
		}
	}
}


const store        = new ContentStore();
export const token = dispatcher.register(store.handleActions.bind(store));
export default store;