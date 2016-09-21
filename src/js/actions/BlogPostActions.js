/**
 * Created by JimBarrows on 7/7/16.
 */
'use strict';

import {BlogPostEventNames} from "../constants";
import axios from "axios";
import dispatcher from "../Dispatcher";

export function create(campaignId, blogPost) {
	axios.post(`/api/campaign/${campaignId}/blogPosts`, blogPost)
			.then((response) =>
					dispatcher.dispatch({
						type: BlogPostEventNames.BLOG_POST_CREATE_SUCCESS,
						campaign: response.data
					})
			)
			.catch((error) =>
					dispatcher.dispatch({
						type: BlogPostEventNames.BLOG_POST_CREATE_FAILURE,
						message: error
					})
			);
}

export function update(blogId, campaignId, blogPost) {
	blogPost._id = blogId;
	axios.put(`/api/campaign/${campaignId}/blogPosts/${blogId}`, blogPost)
			.then((response) => {
				dispatcher.dispatch({
					type: BlogPostEventNames.BLOG_POST_UPDATE_SUCCESS,
					campaign: response.data
				})
			})
			.catch((error) => {
						console.log("ContentActions.update error: ", error);
						dispatcher.dispatch({
							type: BlogPostEventNames.BLOG_POST_UPDATE_FAILURE,
							message: error
						});
					}
			)
}

export function remove(blogPostId, campaignId) {
	axios.delete(`/api/campaign/${campaignId}/blogPosts/${blogPostId}`)
			.then((response) => dispatcher.dispatch({
				type: BlogPostEventNames.BLOG_POST_DELETE_SUCCESS,
				campaign: response.data
			}))
			.catch((error) =>dispatcher.dispatch({
				type: BlogPostEventNames.BLOG_POST_DELETE_FAILURE,
				message: error
			}));
}