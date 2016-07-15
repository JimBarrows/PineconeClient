import React from "react";
import ChannelStore from "../stores/ChannelStore";
import {ChannelStoreEventName} from "../constants";
import * as ChannelActions from "../actions/ChannelAction";
import PageHeader from "../components/bootstrap/PageHeader";
import Alert from "../components/bootstrap/Alert";
import ChannelList from "../components/ChannelList";
import {Link} from "react-router";


export default class Channels extends React.Component {

	constructor() {
		super();
		this.getChannels  = this.getChannels.bind(this);
		this.displayError = this.displayError.bind(this);
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
		ChannelActions.loadChannels();
	}

	componentWillUnmount() {
		ChannelStore.removeListener(ChannelStoreEventName.CHANGE, this.getChannels);
		ChannelStore.removeListener(ChannelStoreEventName.ERROR, this.displayError);
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
										<button type="button" class="btn btn-devault btn-xs" onClick={this.reloadChannels.bind(this)}>
											<span
													class="glyphicon glyphicon-refresh"/>
										</button>
										<Link to="channelEdit" class="btn btn-success btn-xs">
											<span
													class="glyphicon glyphicon-plus"/>
										</Link>
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
}
