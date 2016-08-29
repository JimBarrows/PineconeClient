'use strict';
import * as Actions from "../actions/ContentActions";
import CampaignListStore from "../stores/CampaignListStore";
import {ContentEventNames} from "../constants";
import ContentStore from "../stores/ContentStore";
import {
		DatePickerFormGroup,
		PageHeader,
		SelectFormGroup,
		TextAreaFormGroup,
		TextFormGroup
} from "bootstrap-react-components";
import moment from "moment";
import React from "react";
import {withRouter} from "react-router";

export default withRouter(class ContentEdit extends React.Component {

			bodyChange(event) {
				console.log("Body change: ", event.target.value);
				this.setState({
					body: event.target.value
				});
			}

			campaignChange(event) {
				this.setState({
					campaign: event.target.value
				});
			}

			constructor(props) {
				super(props);
				this.saveSucces                                           = this.saveSucces.bind(this);
				this.saveFailure                                          = this.saveFailure.bind(this);
				let {contentId}                                           = props.location.query;
				let {
						    _id, body, campaign, createDate, owner,
						    publishDate, title, wordpress, facebook, twitter
				    }                                                     = contentId ? ContentStore.findById(contentId) : {
					_id: '',
					body: '',
					campaign: '',
					createDate: moment(),
					publishDate: moment(),
					title: '',
					wordpress: {
						excerpt: '',
						status: 'publish',
						format: '',
						useBody: true,
						count: 140,
						typeToCount: 'characters'
					},
					twitter: {
						status: '',
						useTitle: true
					},
					facebook: {
						post: '',
						useBody: true
					}
				};
				let campaignOptions                                       = CampaignListStore.campaigns.map((campaign) => {
					return {
						"label": campaign.name,
						"value": campaign._id
					}
				});
				this.state                                                = {
					_id, body, campaign, campaignOptions, createDate, owner,
					publishDate, title, wordpress, facebook, twitter
				}


			}

			componentWillMount() {
				ContentStore.on(ContentEventNames.CONTENT_CREATE_SUCCESS, this.saveSucces);
				ContentStore.on(ContentEventNames.CONTENT_CREATE_FAILURE, this.saveFailure);
			}

			componentWillUnmount() {
				ContentStore.removeListener(ContentEventNames.CONTENT_CREATE_SUCCESS, this.saveSucces);
				ContentStore.removeListener(ContentEventNames.CONTENT_CREATE_FAILURE, this.saveFailure);
			}

			excerpt(count, typeToCount, body) {
				let excerpt = '';
				switch (typeToCount) {
					case 'characters':
						excerpt = body.substring(0, count);
						break;
					case 'words':
						excerpt = body.split(' ').splice(0, count).join(' ');
						break;
					case 'sentences':
						excerpt = body.split('.').splice(0, count).join('.') + ".";
						break;
				}
				return excerpt;
			}

			publishDateChange(publishDate) {
				this.setState({
					publishDate: moment(publishDate)
				})
			}

			render() {
				let {
						    _id, body, campaign, campaignOptions, createDate, owner, publishDate,
						    title, wordpress, facebook, twitter
				    }               = this.state;
				let {
						    titleError, bodyError, publishDateError, excerptError,
						    statusError, campaignError, formatError
				    }               = this.state;

				return (
						<div class="contentEdit">
							<PageHeader >
								<h1>Edit Content</h1>
							</PageHeader>
							<form id="contentForm" onSubmit={this.save.bind(this)}>
								<TextFormGroup error={titleError}
								               id="title"
								               label="Title"
								               onChange={this.titleChange.bind(this)}
								               placeholder="10 ways to do something cool"
								               value={title}/>
								<TextAreaFormGroup error={bodyError}
								                   id="body"
								                   label="Body"
								                   name="body"
								                   onChange={this.bodyChange.bind(this)}
								                   value={body}/>
								<DatePickerFormGroup error={publishDateError}
								                     id="publishDate"
								                     label="Publish Date"
								                     onChange={this.publishDateChange.bind(this)}
								                     type="date"
								                     value={publishDate}/>
								<SelectFormGroup error={campaignError}
								                 id="campaign"
								                 label="Campaign"
								                 onChange={this.campaignChange.bind(this)}
								                 options={campaignOptions}
								                 value={campaign}/>
								{/*<FacebookContent facebook={facebook} onChange={this.fieldChange.bind(this)}/>*/}
								{/*<TwitterContent twitter={twitter} onChange={this.fieldChange.bind(this)}/>*/}
								{/*<WordpressContent wordpress={wordpress} onChange={this.fieldChange.bind(this)}/>*/}
								<button id='saveButton' class="btn btn-primary">Save
								</button>
							</form>
						</div>
				);
			}

			save(event) {
				event.preventDefault();
				let {
						    _id, body, campaign, createDate, owner,
						    publishDate, title, wordpress, twitter, facebook
				    }     = this.state;
				let valid = true;
				if (!body) {
					this.setState({
						bodyError: "Content must have a body"
					});
					valid = false;
				}
				if (!campaign) {
					this.setState({
						channelError: "Content must have a campaign"
					});
					valid = false;
				}

				if (!publishDate) {
					this.setState({
						publishDateError: "Content must have a publish date"
					});
					valid = false;
				}
				if (!title) {
					this.setState({
						titleError: "Content must have a title"
					});
					valid = false;
				}

				if (valid) {
					if (this.state._id) {
						Actions.update(_id, {body, campaign, createDate, owner, publishDate, title, wordpress, facebook, twitter});
					} else {
						Actions.create({body, campaign, createDate, owner, publishDate, title, wordpress, facebook, twitter});
					}
				}
			}

			saveFailure() {
				this.setState({
					error: ContentStore.error()
				})
			}

			saveSucces() {
				this.props.router.push('/content');
			}

			titleChange(event) {
				console.log("title change: ", event.target.value);
				this.setState({
					title: event.target.value,
				});
			}
		}
)