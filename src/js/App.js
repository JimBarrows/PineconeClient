/**
 * Created by JimBarrows on 10/8/19.
 */

import React, {Component}          from 'react'
import {Route, Switch, withRouter} from 'react-router'
import Header                      from './components/Header'
import CampaignAdd                 from './pages/CampaignAdd'
import CampaignEdit                from './pages/CampaignEdit'
import Campaigns                   from './pages/Campaigns'
import EditBlogPost                from './pages/EditBlogPost'
import FinishTwitter               from './pages/FinishTwitter'
import Login                       from './pages/Login'
import NewBlogPost                 from './pages/NewBlogPost'
import Register                    from './pages/Register'
import Settings                    from './pages/Settings'
import UserStore                   from './stores/UserStore'

function requireAuth (nextState, replace) {
	if (!UserStore.user()) {
		replace({
							pathname: '/login',
							state   : {nextPathname: nextState.location.pathname}
						})
	}
}

export default withRouter(class App extends Component {

	gotoIndex = () => this.props.history.push('/')

	render () {
		return (
			<div >
				<Header id = {'app'} indexLinkClicked = {this.gotoIndex} />
				<div id = {"layout"} className = "container" role = {"main"} >
					<Switch >
						<Route exact path = "/" component = {Campaigns} onEnter = {requireAuth} />
						<Route exact path = 'campaign' component = {CampaignAdd} />
						<Route exact path = {"campaign/:campaignId"} component = {CampaignEdit} />
						<Route path = "campaign/:campaignId/blogPosts/new" name = "newBlogPost" component = {NewBlogPost}
									 onEnter = {requireAuth} ></Route >
						<Route path = "campaign/:campaignId/blogPosts/:blogPostId" name = "editBlogPost" component = {EditBlogPost}
									 onEnter = {requireAuth} ></Route >
						<Route path = "finish/twitter" name = "finishTwitter" component = {FinishTwitter}
									 onEnter = {requireAuth} ></Route >
						<Route path = "settings" name = "settings" component = {Settings} onEnter = {requireAuth} ></Route >
						<Route path = "register" name = "register" component = {Register} ></Route >
						<Route path = "login" name = "login" component = {Login} ></Route >
					</Switch >
				</div >
			</div >
		)
	}
})
