import * as Application from "./actions/Application";
import NewBlogPost from "./pages/NewBlogPost";
import CampaignAdd from "./pages/CampaignAdd";
import CampaignEdit from "./pages/CampaignEdit";
import Campaigns from "./pages/Campaigns";
import FinishTwitter from "./pages/FinishTwitter";
import {hashHistory, IndexRoute, Route, Router} from "react-router";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import React from "react";
import Register from "./pages/Register";
import ReactDOM from "react-dom";
import Settings from "./pages/Settings";
import UserStore from "./stores/UserStore";


const app = document.getElementById('app');

function requireAuth(nextState, replace) {
	if (!UserStore.user()) {
		replace({
			pathname: '/login',
			state: {nextPathname: nextState.location.pathname}
		})
	}
}

Application.initialize();

ReactDOM.render(<Router history={hashHistory}>
	<Route path="/" component={Layout}>
		<IndexRoute component={Campaigns} onEnter={requireAuth}></IndexRoute>
		<Route path="campaign" name="campaignAdd" component={CampaignAdd} onEnter={requireAuth}></Route>
		<Route path="campaign/:campaignId" name="campaignEdit" component={CampaignEdit} onEnter={requireAuth}></Route>
		<Route path="campaign/:campaignId/newBlogPost" name="newBlogPost" component={NewBlogPost}
		       onEnter={requireAuth}></Route>
		<Route path="finish/twitter" name="finishTwitter" component={FinishTwitter} onEnter={requireAuth}></Route>
		<Route path="settings" name="settings" component={Settings} onEnter={requireAuth}></Route>
		<Route path="register" name="register" component={Register}></Route>
		<Route path="login" name="login" component={Login}></Route>
	</Route>
</Router>, app);