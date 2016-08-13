'use strict';
import React from "react";
import PageHeader from "../components/bootstrap/PageHeader";
import ContentList from "../components/ContentList";
import {withRouter} from "react-router";
import * as Actions from "../actions/ContentActions";
import ContentStore from "../stores/ContentStore";
import {ContentEventNames} from "../constants";
import Alert from "../components/bootstrap/Alert";
import ListTablePanel from "../components/controls/ListTablePanel";

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
					<PageHeader title="Content"/>
					<Alert error={error}/>
					<ListTablePanel title="Content" onReloadClick={this.reloadContent.bind(this)}
					                onAddClick={this.addButtonClicked.bind(this)}>
						<ContentList content={content}/>
					</ListTablePanel>

				</div>
		);
	}
})