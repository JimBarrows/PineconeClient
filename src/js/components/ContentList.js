'use strict';
import React from "react";
import ContentRow from "./ContentRow";

export default class ContentList extends React.Component {

	render() {
		let {content}   = this.props;
		let contentRows = content.map((piece, index) => <ContentRow key={piece._id || index} content={piece}/>);
		return (
					<tbody>
					{contentRows}
					</tbody>
		);
	}
}