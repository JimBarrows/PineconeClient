'use strict';
import React from "react";
import FacebookLogin from "react-facebook-login";
import moment from "moment";

export default class FacebookLoginComponent extends React.Component {

	constructor(props) {
		super(props);
		this.addFacebook = this.props.saveFacebook;
	}

	responseFacebook = (response) => {
		console.log(response);
		let {name, email, accessToken, expiresIn, signedRequest, userID} = response;
		expiresIn = moment().add(expiresIn, 'ms');
		this.addFacebook(name, email, accessToken, expiresIn, signedRequest, userID);
	};


	render() {
		return (
				<FacebookLogin
						appId="1236802509686356"
						autoLoad={true}
						fields="name,email"
						icon="fa-facebook"
						callback={this.responseFacebook.bind(this)}/>
		);
	}
}