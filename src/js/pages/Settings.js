import React from "react";
import FacebookLogin from "../components/FacebookLogin";
import * as UserActions from "../actions/UserActions";
import PageHeader from "bootstrap-react-components/src/PageHeader.jsx";
import TablePanel from "bootstrap-react-components/src/TablePanel.jsx";
import Panel from "bootstrap-react-components/src/Panel.jsx";
import RowControlButtons from "../components/RowControlButtons";

export default class Settings extends React.Component {

	addFacebookId(name, email, accessToken, expiresIn, signedRequest, userId) {
		UserActions.addFacebookUserId(accessToken, email, expiresIn, name, signedRequest, userId);
	}

	addTwitterAccount() {
		UserActions.addTwitterAccount();
	}

	edit() {
		console.log("Edit");
	}

	save() {
		console.log("Save");
	}

	remove() {
		console.log("remove");
	}

	render() {
		const scope = {scope: 'publish_pages, email'};
		const appId = "1236802509686356";
		return (
				<div>
					<PageHeader title="Settings"/>
					<TablePanel title="Messages">
						<table class="table table-striped">
							<thead>
							<tr>
								<th>Message</th>
								<th></th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>Fake Message 1</td>
								<td><RowControlButtons editing={false} edit={this.edit.bind(this)} save={this.save.bind(this)}
								                       remove={this.remove.bind(this)}/></td>
							</tr>
							</tbody>
						</table>
					</TablePanel>
					<Panel title="Channels">
						<div class="panel-body">
							<ul class="nav nav-tabs">
								<li class="active"><a href="#facebookTabPane" data-toggle="tab">Facebook</a></li>
								<li><a href="#twitterTabPane" data-toggle="tab">Twitter</a></li>
							</ul>
						</div>
						<div class="panel-body">
							<div class="tab-content">
								<div class="tab-pane active" id="facebookTabPane">
									<FacebookLogin saveFacebook={this.addFacebookId.bind(this)} scope={scope} appId={appId}/>
									<table class="table table-striped">
										<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td>Fake Name</td>
											<td>Fake Email</td>
											<td><RowControlButtons editing={false} edit={this.edit.bind(this)} save={this.save.bind(this)}
											                       remove={this.remove.bind(this)}/></td>
										</tr>
										</tbody>
									</table>
								</div>
								<div class="tab-pane fade" id="twitterTabPane">
									<button class="btn btn-default" onClick={this.addTwitterAccount.bind(this)}>Add Twitter Acount
									</button>
									<table class="table table-striped">
										<thead>
										<tr>
											<th>Email</th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td>Fake Email</td>
											<td><RowControlButtons editing={false} edit={this.edit.bind(this)} save={this.save.bind(this)}
											                       remove={this.remove.bind(this)}/></td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</Panel>
				</div>
		);
	}
}
