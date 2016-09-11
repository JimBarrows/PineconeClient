"use strict";
import axios from "axios";
import dispatcher from "../Dispatcher";
import {UserEventNames} from "../constants";
// import FB from "fb";

export function deleteAsset(asset) {
	axios.delete("/api/user/asset/" + asset._id)
			.then(() => axios.get("/api/user"))
			.then((response) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT,
				account: response.data
			}))
			.catch((error) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
				error: error,
				asset: asset
			}));
}

export function deleteDestination(destination) {
	axios.delete("/api/user/destination/" + destination._id)
			.then(() => axios.get("/api/user"))
			.then((response) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT,
				account: response.data
			}))
			.catch((error) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
				error: error
			}));
}

export function deleteFacebookAccount(facebookAccount) {
	axios.delete("/api/user/facebookAccount/" + facebookAccount._id)
			.then(() => axios.get("/api/user"))
			.then((response) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT,
				account: response.data
			}))
			.catch((error) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
				error: error
			}));
}

export function deleteKeyword(keyword) {
	axios.delete("/api/user/keyword/" + keyword._id)
			.then(() => axios.get("/api/user"))
			.then((response) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT,
				account: response.data
			}))
			.catch((error) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
				error: error
			}));
}

export function deleteMessage(message) {
	axios.delete("/api/user/message/" + message._id)
			.then(() => axios.get("/api/user"))
			.then((response) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT,
				account: response.data
			}))
			.catch((error) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
				error: error
			}));
}

export function deleteTwitterAccount(twitterAccount) {
	axios.delete("/api/user/twitterAccount/" + twitterAccount._id)
			.then(() => axios.get("/api/user"))
			.then((response) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT,
				account: response.data
			}))
			.catch((error) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
				error: error
			}));
}

export function deleteWordpressAccount(wordpressAccount) {
	axios.delete("/api/user/wordpressAccount/" + wordpressAccount._id)
			.then(() => axios.get("/api/user"))
			.then((response) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT,
				account: response.data
			}))
			.catch((error) => dispatcher.dispatch({
				type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
				error: error
			}));
}

export function login(username, password) {
	axios.post("/api/user/login", {
				username
				, password
			})
			.then(function (response) {
				dispatcher.dispatch({
					type: UserEventNames.USER_LOGGED_IN
					, content: response.data
				})
			})
			.catch(function (error) {
				console.log("Error logging in: ", error);
				let errorMessage = "Unknown error";
				if (error.data) {
					errorMessage = error.data;
				} else if (error.status > 299) {
					errorMessage = error.status + " - " + error.statusText;
				}
				dispatcher.dispatch({
					type: UserEventNames.USER_LOGIN_FAILURE
					, username
					, error: errorMessage
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
	axios.post("/api/user/register", {username, password})
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
						type: UserEventNames.REGISTER_USER_SUCCESS
						, content: response.data
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

export function saveAsset(asset) {
	if (asset._id) {
		axios.put("/api/user/asset/" + asset._id, asset)
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					asset: asset
				}));
	} else {
		axios.post("/api/user/assets", asset)
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					asset: asset
				}));
	}

}

export function saveDestination(destination) {
	if (destination._id) {
		axios.put("/api/user/destination/" + destination._id, destination)
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					destination: destination
				}));
	} else {
		axios.post("/api/user/destinations", destination)
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					destination: destination
				}));
	}
}

export function saveFacebookAccount(facebookAccount) {
	if (facebookAccount._id) {
		axios.put("/api/user/facebookAccount/" + facebookAccount._id, twitterAccount)
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					facebookAccount
				}));
	} else {
		axios.post("/api/user/facebookAccounts", facebookAccount)
				.then((response)=> {
					let clientId         = "1236802509686356";
					let redirectUrl      = encodeURIComponent("http://127.0.0.1:8080/api/user/facebookAccount/finish/");
					window.location.href = `https://www.facebook.com/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUrl}`;
				})
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					facebookAccount
				}));
	}
}


export function saveKeyword(keyword) {
	if (keyword._id) {
		axios.put("/api/user/keyword/" + keyword._id, keyword)
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					keyword: keyword
				}));
	} else {
		axios.post("/api/user/keywords", keyword)
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					keyword: keyword
				}));
	}
}

export function saveMessage(message) {
	if (message._id) {
		axios.put("/api/user/message/" + message._id, message)
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					message: message
				}));
	} else {
		axios.post("/api/user/messages", message)
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					message: error.data
				}));
	}
}

export function saveTwitterAccount(twitterAccount) {
	if (twitterAccount._id) {
		axios.put("/api/user/twitterAccount/" + twitterAccount._id, twitterAccount)
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					twitterAccount
				}));
	} else {
		axios.post("/api/user/twitterAccounts", twitterAccount)
				.then((response)=> {
					window.location.href = "https://api.twitter.com/oauth/authorize?oauth_token=" + response.data.oauth_token;
				})
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					twitterAccount
				}));
	}
}

export function saveWordpressAccount(wordpressAccount) {
	if (wordpressAccount._id) {
		axios.put("/api/user/wordpressAccount/" + wordpressAccount._id, wordpressAccount)
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					wordpressAccount
				}));
	} else {
		axios.post("/api/user/wordpressAccounts", wordpressAccount)
				.then(() => axios.get("/api/user"))
				.then((response) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT,
					account: response.data
				}))
				.catch((error) => dispatcher.dispatch({
					type: UserEventNames.UPDATE_ACCOUNT_FAILURE,
					error: error,
					wordpressAccount
				}));
	}
}