import React from "react";

export default class PageHeader extends React.Component {

	render() {
		const {title} = this.props;
		return (
				<div class="page-header">
					<h1>{title}</h1>
				</div>
		);
	}
}
