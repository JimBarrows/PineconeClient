import React from "react";
import PageHeader from "../components/bootstrap/PageHeader";
import FacebookLogin from "../components/FacebookLogin";
import * as UserActions from "../actions/UserActions";

export default class Settings extends React.Component {

	addFacebookId(name, email, accessToken, expiresIn, signedRequest, userId) {
		UserActions.addFacebookUserId(userId);
	}

	render() {
		return (
				<div>
					<PageHeader title="Settings"/>
					<FacebookLogin saveFacebook={this.addFacebookId.bind(this)}/>
				</div>
		);
	}
}
