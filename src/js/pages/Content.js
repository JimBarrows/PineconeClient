'use strict';
import * as Actions from "../actions/ContentActions";
import {ContentEventNames} from "../constants";
import ContentList from "../components/ContentList";
import {DangerAlert, ListTablePanel, PageHeader} from "bootstrap-react-components";
import ContentStore from "../stores/ContentStore";
import React from "react";
import {withRouter} from "react-router";

class Content extends React.Component {

	componentWillMount() {
		ContentStore.on(ContentEventNames.CONTENT_FETCH_SUCCESS, this.contentFetched);
		ContentStore.on(ContentEventNames.CONTENT_FETCH_FAILURE, this.contentFailure);
		ContentStore.on(ContentEventNames.CONTENT_DELETE_SUCCESS, this.contentDeleted);
		ContentStore.on(ContentEventNames.CONTENT_DELETE_FAILURE, this.contentFailure);
		Actions.load();
	}

	componentWillUnmount() {
		ContentStore.removeListener(ContentEventNames.CONTENT_FETCH_SUCCESS, this.contentFetched);
		ContentStore.removeListener(ContentEventNames.CONTENT_FETCH_FAILURE, this.contentFailure);
		ContentStore.removeListener(ContentEventNames.CONTENT_DELETE_SUCCESS, this.contentDeleted);
		ContentStore.removeListener(ContentEventNames.CONTENT_DELETE_FAILURE, this.contentFailure);
	}

	constructor() {
		super();
		this.contentFetched = this.contentFetched.bind(this);
		this.contentFailure = this.contentFailure.bind(this);
		this.contentDeleted = this.contentDeleted.bind(this);
		this.state          = {
			content: ContentStore.all(),
			error: ""
		}
	}

	contentFailure() {
		this.setState({
			content: ContentStore.all(),
			error: ContentStore.error()
		})
	}

	contentDeleted() {
		this.setState({
			content: ContentStore.all(),
			error: ""
		})
	}

	contentFetched() {
		this.setState({
			content: ContentStore.all(),
			error: ""
		})
	}

	reloadContent() {
		Actions.load();
	}

	addButtonClicked() {
		this.props.router.push('/contentEdit');
	}

	render() {
		let {content, error} = this.state;
		return (
				<div>
					<PageHeader >
						<h1>Content</h1>
					</PageHeader>
					<DangerAlert error={error}/>
					<ListTablePanel title="Content" onAddClick={this.addButtonClicked.bind(this)}>
						<thead>
						<tr>
							<th>Name</th>
							<th>Publish Date</th>
							<th>Campaign</th>
						</tr>
						</thead>
						<ContentList content={content}/>
					</ListTablePanel>
				</div>
		);
	}
}

export default withRouter(Content);