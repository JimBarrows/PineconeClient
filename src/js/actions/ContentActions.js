/**
 * Created by JimBarrows on 7/7/16.
 */
'use strict';

import {ContentEventNames} from "../constants";
import axios from "axios";
import dispatcher from "../Dispatcher";

export function load() {
	axios.get('/api/content')
			.then(function (response) {
				dispatcher.dispatch({
					type: ContentEventNames.CONTENT_FETCH_SUCCESS,
					content: response.data
				})
			})
			.catch(function (error) {
				dispatcher.dispatch({
					type: ContentEventNames.CONTENT_FETCH_FAILURE,
					message: error
				});
			});
}

export function create(content) {
	axios.post('/api/content', content)
			.then((response) =>
					dispatcher.dispatch({
						type: ContentEventNames.CONTENT_CREATE_SUCCESS,
						content: response.data
					})
			)
			.catch((error) =>
					dispatcher.dispatch({
						type: ContentEventNames.CONTENT_CREATE_FAILURE,
						message: error
					})
			);
}

export function update(id, content) {
	axios.put('/api/content/' + id, content)
			.then((response) => {
				dispatcher.dispatch({
					type: ContentEventNames.CONTENT_UPDATE_SUCCESS,
					content
				})
			})
			.catch((error) => {
						console.log("ContentActions.update error: ", error);
						dispatcher.dispatch({
							type: ContentEventNames.CONTENT_UPDATE_FAILURE,
							message: error
						});
					}
			)
}

export function remove(content) {
	axios.delete('/api/content/' + content._id)
			.then((response) => dispatcher.dispatch({
				type: ContentEventNames.CONTENT_DELETE_SUCCESS,
				content: content
			}))
			.catch((error) =>dispatcher.dispatch({
				type: ContentEventNames.CONTENT_DELETE_FAILURE,
				message: error
			}));
}