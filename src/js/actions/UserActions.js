"use strict";
import axios from "axios";
import dispatcher from "../Dispatcher";
import {UserEventNames} from "../constants";

export function addFacebookUserId(facebookUserId, accessToken, expiresIn) {
	axios.put("/api/user/facebookId", {facebookUserId, accessToken, expiresIn})
			.then(() =>
					dispatcher.dispatch({
						type: UserEventNames.USER_FACEBOOK_ID_ADDED,
						facebookUserId, accessToken, expiresIn
					}))
			.catch((error) => dispatcher.dispatch({
				type: UserEventNames.USER_FACEBOOK_ID_ADD_ERROR,
				error: error.data ? error.data : error
			}));

}
export function login(username, password) {
	dispatcher.dispatch({
		type: UserEventNames.USER_LOGIN_BEGINS
		, username
	});
	axios.post("/api/user/login", {
				username
				, password
			})
			.then(function (response) {
				dispatcher.dispatch({
					type: UserEventNames.USER_LOGGED_IN
					, username: response.data.username
					, id: response.data.id
				})
			})
			.catch(function (error) {
				dispatcher.dispatch({
					type: UserEventNames.USER_LOGIN_FAILURE
					, username
					, error: error.data ? error.data : error
				})
			})
}

export function logout() {
	axios.get("/api/user/logout")
			.then(function () {
				dispatcher.dispatch({
					type: UserEventNames.USER_LOGGED_OUT
				});
			})
			.catch(function (error) {
				dispatcher.dispatch({
					type: UserEventNames.USER_LOGOUT_FAILURE
					, error: error.data
				})
			})
}

export function registerUser(username, password) {

	dispatcher.dispatch({
		type: UserEventNames.REGISTER_USER_BEGINS
		, username
	});

	axios.post("/api/user/register", {
				username
				, password
			})
			.then(function (response) {
				if (response.data.error) {
					dispatcher.dispatch({
						type: UserEventNames.REGISTER_USER_FAILURE
						, username
						, error: {
							data: response.data.error
						}
					})
				} else {
					dispatcher.dispatch({
						type: UserEventNames.USER_LOGGED_IN
						, username: response.data.username
						, id: response.data.id
					})
				}
			})
			.catch(function (error) {
				dispatcher.dispatch({
					type: UserEventNames.REGISTER_USER_FAILURE
					, username
					, error
				})
			})
}

