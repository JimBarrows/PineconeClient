'use strict'
import {PageHeader}        from "bootstrap-react-components"
import React               from "react"
import {withRouter}        from "react-router"
import * as CampaignAction from "../actions/CampaignActions"
import CampaignForm        from "../components/CampaignForm"
import {CampaignEvent}     from "../constants"
import CampaignStore       from "../stores/CampaignStore"


export default withRouter(class CampaignAdd extends React.Component {

	componentDidMount () {
		CampaignStore.on(CampaignEvent.LOAD_CAMPAIGN_SUCCESS, this.update)
		CampaignStore.on(CampaignEvent.UPDATE_SUCCESS, this.update)
		CampaignAction.clear()
	}

	componentWillUnmount () {
		CampaignStore.removeListener(CampaignEvent.LOAD_CAMPAIGN_SUCCESS, this.update)
		CampaignStore.removeListener(CampaignEvent.UPDATE_SUCCESS, this.update)
	}

	onSubmit = campaign => {
		CampaignAction.create(campaign)
		this.props.history.push('/')
	}

	render () {
		const id = "CampaignAdd"
		return (
			<div class="campaign add page" >
				<PageHeader id={id} >
					<h1 >Define Campaign</h1 >
				</PageHeader >
				<CampaignForm campaign={this.state.campaign} onSubmit={this.onSubmit.bind(this)} />
			</div >
		)
	}

	state = {
		campaign: CampaignStore.campaign
	}

	update = () => this.setState({campaign: CampaignStore.campaign})

})
