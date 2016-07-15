import React from "react";

export default class DangerAlert extends React.Component {

	render() {
		const {error} = this.props;
		var Alert = null;
		if (error) {
			Alert = (<div class="alert alert-danger" role="alert">{error}</div>)
		}
		return Alert

	}
}