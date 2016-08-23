'use strict';
import * as Actions from "../actions/ContentActions";
import {ContentEventNames} from "../constants";
import ContentList from "../components/ContentList";
import {DangerAlert, ListTablePanel, PageHeader} from "bootstrap-react-components";
import ContentStore from "../stores/ContentStore";
import React from "react";
import {withRouter} from "react-router";

export default withRouter(class Content extends React.Component {

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

	contentFailure() {
		this.setState({
			error: ContentStore.error(),
			content: ContentStore.all()
		})
	}

	contentDeleted() {
		this.setState({
			content: ContentStore.all()
		})
	}

	contentFetched() {
		this.setState({
			content: ContentStore.all()
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
					<ListTablePanel title="Content" onReloadClick={this.reloadContent.bind(this)}
					                onAddClick={this.addButtonClicked.bind(this)}>
						<thead>
						<tr>
							<th>Name</th>
							<th>Publish Date</th>
							<th>Channel</th>
						</tr>
						</thead>
						<ContentList content={content}/>
					</ListTablePanel>

				</div>
		);
	}
})