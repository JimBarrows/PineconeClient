/**
 * Created by JimBarrows on 7/7/16.
 */
'use strict';

import {BlogPostEventNames} from "../constants";
import axios from "axios";
import dispatcher from "../Dispatcher";

export function load() {
	axios.get('/api/content')
			.then(function (response) {
				dispatcher.dispatch({
					type: BlogPostEventNames.BLOG_POST_FETCH_SUCCESS,
					content: response.data
				})
			})
			.catch(function (error) {
				dispatcher.dispatch({
					type: BlogPostEventNames.BLOG_POST_FETCH_FAILURE,
					message: error
				});
			});
}

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

export function update(id, content) {
	axios.put('/api/content/' + id, content)
			.then((response) => {
				dispatcher.dispatch({
					type: BlogPostEventNames.BLOG_POST_UPDATE_SUCCESS,
					content
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

export function remove(content) {
	axios.delete('/api/content/' + content._id)
			.then((response) => dispatcher.dispatch({
				type: BlogPostEventNames.BLOG_POST_DELETE_SUCCESS,
				content: content
			}))
			.catch((error) =>dispatcher.dispatch({
				type: BlogPostEventNames.BLOG_POST_DELETE_FAILURE,
				message: error
			}));
}