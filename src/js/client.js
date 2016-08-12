import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import * as Application from "./actions/Application";
import Campaigns from "./pages/Campaigns";
import CampaignEdit from "./pages/CampaignEdit";
import Content from "./pages/Content";
import ContentEdit from "./pages/ContentEdit";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
		<Route path="campaignEdit" name="campaignEdit" component={CampaignEdit} onEnter={requireAuth}></Route>
		<Route path="content" name="content" component={Content} onEnter={requireAuth}></Route>
		<Route path="contentEdit" name="contentEdit" component={ContentEdit} onEnter={requireAuth}></Route>
		<Route path="settings" name="settings" component={Settings} onEnter={requireAuth}></Route>
		<Route path="register" name="register" component={Register}></Route>
		<Route path="login" name="login" component={Login}></Route>
	</Route>
</Router>, app);