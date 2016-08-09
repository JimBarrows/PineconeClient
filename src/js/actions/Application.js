/**
 * Created by JimBarrows on 8/8/16.
 */
'use strict';
import axios from "axios";
import dispatcher from "../Dispatcher";
import {UserEventNames} from "../constants";

export function initialize() {
	axios.get("/api/user")
			.then((response) => {
				dispatcher.dispatch({
					type: UserEventNames.USER_LOGGED_IN,
					content: response.data
				})
			})
			.catch((error) => {
				//ignoring because the user should still be directed to the login/register page.
			});

}