'use strict'
import {PageHeader, PanelStripedTable, TableHead} from "bootstrap-react-components"
import React                                      from "react"
import {withRouter}                               from "react-router"
import * as CampaignActions                       from "../actions/CampaignActions"
import CampaignTableRow                           from "../components/CampaignTableRow"
import {CampaignEvent}                            from "../constants"
import CampaignStore                              from "../stores/CampaignListStore"

export default withRouter(class Campaigns extends React.Component {

	constructor (props) {
		super(props)
		this.updateCampaignList = this.updateCampaignList.bind(this)
		this.state              = {
			campaigns: []
		}
	}

	add = () => this.props.router.push('/campaign')

	componentDidMount () {
		CampaignStore.on(CampaignEvent.CREATE_SUCCESS, this.updateCampaignList)
		CampaignStore.on(CampaignEvent.LOAD_LIST_SUCCESS, this.updateCampaignList)
		CampaignStore.on(CampaignEvent.UPDATE_SUCCESS, this.updateCampaignList)
		CampaignStore.on(CampaignEvent.REMOVE_CAMPAIGN_SUCCESS, this.updateCampaignList)
		CampaignActions.load()
	}

	componentWillUnmount () {
		CampaignStore.removeListener(CampaignEvent.CREATE_SUCCESS, this.updateCampaignList)
		CampaignStore.removeListener(CampaignEvent.LOAD_LIST_SUCCESS, this.updateCampaignList)
		CampaignStore.removeListener(CampaignEvent.UPDATE_SUCCESS, this.updateCampaignList)
		CampaignStore.removeListener(CampaignEvent.REMOVE_CAMPAIGN_SUCCESS, this.updateCampaignList)

	}


	render () {
		let campaignRows = this.state.campaigns.map((campaign, index) =>
																									<CampaignTableRow key = {index} campaign = {campaign} />)
		const id         = 'campaigns'
		return (
			<div >
				<PageHeader id = {id} >
					<h1 >Campaigns</h1 >
				</PageHeader >
				<PanelStripedTable id = {id} onAddClick = {this.add} title = {'Campaigns'} >
					<TableHead id = {id} >
						<tr >
							<th >Name</th >
							<th >Start Date</th >
							<th >End Date</th >
						</tr >
					</TableHead >
					{campaignRows}
				</PanelStripedTable >
			</div >
		)
	}

	updateCampaignList () {
		this.setState({
										campaigns: CampaignStore.campaigns
									})
	}
})

