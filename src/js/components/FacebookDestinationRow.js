'use strict';
import React from "react";

export default class FacebookDestinationRow extends React.Component {

	render() {
		let {index, name, pageId} = this.props;
		return (
				<tr key={index}>
					<td>{name}</td>
					<td>{pageId}</td>
				</tr>
		);
	}
}