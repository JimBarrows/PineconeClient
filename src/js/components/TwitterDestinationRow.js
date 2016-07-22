'use strict';
import React from "react";

export default class TwitterDestinationRow extends React.Component {

	constructor(props) {
		super(props);
		let {index, twitterDestination} = props;
		let {_id, name, oauthToken, oauthVerifier, accessToken} = twitterDestination;
		this.state = {
			_id,
			index,
			name,
			oauthToken,
			oauthVerifier,
			accessToken,
			edit: !(name && oauthToken && oauthVerifier && accessToken)
		};
	}

	render() {
		let {index, _id, name, oauthToken, oauthVerifier, accessToken} = this.state;
		let id = _id || "tdr_" + index;
		return (
				<tr id={id}>
					<td>{name}</td>
					<td>{oauthToken}</td>
					<td>{oauthVerifier}</td>
					<td>{accessToken}</td>
				</tr>
		);
	}
}