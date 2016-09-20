'use strict';
import {EventEmitter} from "events";
import {BlogPostEventNames} from "../constants";
import dispatcher from "../Dispatcher";

class BlogPostStore extends EventEmitter {
	constructor() {
		super();
		this.blogPost = [];
		this._error   = "";
	}

	all() {
		return this.blogPost
	};

	findById(id) {
		let found = this.blogPost.filter((piece) => piece._id === id);
		return found[0];
	}

	error() {
		return this._error;
	}

	handleActions(action) {
		switch (action.type) {
			case BlogPostEventNames.BLOG_POST_FETCH_SUCCESS:
				this.blogPost = action.blogPost;
				this._error  = "";
				this.emit(BlogPostEventNames.BLOG_POST_FETCH_SUCCESS);
				break;
			case BlogPostEventNames.BLOG_POST_FETCH_FAILURE:
				this.blogPost = [];
				this._error  = action.message;
				this.emit(BlogPostEventNames.BLOG_POST_FETCH_FAILURE);
				break;
			case BlogPostEventNames.BLOG_POST_CREATE_SUCCESS:
				this.blogPost.push(action.blogPost);
				this._error = "";
				this.emit(BlogPostEventNames.BLOG_POST_CREATE_SUCCESS);
				break;
			case BlogPostEventNames.BLOG_POST_CREATE_FAILURE:
				this._error = action.message;
				this.emit(BlogPostEventNames.BLOG_POST_CREATE_FAILURE);
				break;
			case BlogPostEventNames.BLOG_POST_DELETE_SUCCESS:
				this.blogPost = this.blogPost.filter((piece)=>piece._id !== action.blogPost._id);
				this._error  = "";
				this.emit(BlogPostEventNames.BLOG_POST_DELETE_SUCCESS);
				break;
			case BlogPostEventNames.BLOG_POST_DELETE_FAILURE:
				this._error = action.message;
				this.emit(BlogPostEventNames.BLOG_POST_DELETE_FAILURE);
				break;
			case BlogPostEventNames.BLOG_POST_UPDATE_SUCCESS:
				let blogPostIndex            = this.blogPost.findIndex((piece)=>piece._id !== action.blogPost._id);
				this.blogPost[blogPostIndex] = action.blogPost;
				this._error                = "";
				this.emit(BlogPostEventNames.BLOG_POST_UPDATE_SUCCESS);
				break;
			case BlogPostEventNames.BLOG_POST_UPDATE_FAILURE:
				this._error = action.message;
				this.emit(BlogPostEventNames.BLOG_POST_UPDATE_FAILURE);
				break;
		}
	}
}


const store        = new BlogPostStore();
export const token = dispatcher.register(store.handleActions.bind(store));
export default store;