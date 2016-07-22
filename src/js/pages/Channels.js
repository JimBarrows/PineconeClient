import React from "react";
import ChannelStore from "../stores/ChannelStore";
import {ChannelStoreEventName} from "../constants";
import * as ChannelActions from "../actions/ChannelAction";
import PageHeader from "../components/bootstrap/PageHeader";
import Alert from "../components/bootstrap/Alert";
import ChannelList from "../components/ChannelList";
import {withRouter} from "react-router";

export default withRouter(class Channels extends React.Component {

	constructor() {
		super();
		this.getChannels  = this.getChannels.bind(this);
		this.displayError = this.displayError.bind(this);
		this.gotoChannel  = this.gotoChannel.bind(this);
		this.state        = {
			channels: ChannelStore.getAll(),
			newChannelName: "",
			fetching: false,
			error: ""
		}
	}

	componentWillMount() {
		ChannelStore.on(ChannelStoreEventName.CHANGE, this.getChannels);
		ChannelStore.on(ChannelStoreEventName.ERROR, this.displayError);
		ChannelStore.on(ChannelStoreEventName.CURRENT_CHANNEL_CHANGE, this.gotoChannel);
		ChannelActions.loadChannels();
	}

	componentWillUnmount() {
		ChannelStore.removeListener(ChannelStoreEventName.CHANGE, this.getChannels);
		ChannelStore.removeListener(ChannelStoreEventName.ERROR, this.displayError);
		ChannelStore.removeListener(ChannelStoreEventName.CURRENT_CHANNEL_CHANGE, this.gotoChannel);
	}

	gotoChannel() {
		this.props.router.push('/channelEdit');
	}

	getChannels() {
		this.setState({
			channels: ChannelStore.getAll()
		});
	}

	displayError(error) {
		this.setState({
			error
		})
	}

	reloadChannels() {
		ChannelActions.loadChannels();
	}

	newChannel() {
		ChannelActions.newChannel();
	}

	render() {
		const {channels, error} =this.state;

		return (
				<div class="channels">
					<PageHeader title="Channels"/>
					<div class="row">
						<div class="col-md-12">
							<Alert error={error}/>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div id="channelPanel" class="panel panel-default">
								<div class="panel-heading clearfix">
									<div class="panel-title pull-left">Channels</div>
									<div class="btn-group pull-right">
										<button type="button" class="btn btn-default btn-xs" onClick={this.reloadChannels.bind(this)}>
											<span
													class="glyphicon glyphicon-refresh"/>
										</button>
										<button type="button" class="btn btn-default btn-xs" onClick={this.newChannel.bind(this)}>
											<span
													class="glyphicon glyphicon-plus"/>
										</button>
									</div>
								</div>
								<div class="panel-body">
									<ChannelList channels={channels}/>
								</div>
							</div>
						</div>
					</div>
				</div>
		);
	}
});
