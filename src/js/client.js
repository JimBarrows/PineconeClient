import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import Layout from "./components/Layout";
import Settings from "./pages/Settings";
import Channels from "./pages/Channels";
import Register from "./pages/Register";
import ChannelEdit from "./pages/ChannelEdit";
import Content from "./pages/Content";
import ContentEdit from "./pages/ContentEdit";
import Login from "./pages/Login";
import UserStore from "./stores/UserStore";
import * as Application from "./actions/Application";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
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
		<IndexRoute component={Channels} onEnter={requireAuth}></IndexRoute>
		<Route path="channelEdit" name="channelEdit" component={ChannelEdit} onEnter={requireAuth}></Route>
		<Route path="content" name="content" component={Content} onEnter={requireAuth}></Route>
		<Route path="contentEdit" name="contentEdit" component={ContentEdit} onEnter={requireAuth}></Route>
		<Route path="settings" name="settings" component={Settings} onEnter={requireAuth}></Route>
		<Route path="register" name="register" component={Register}></Route>
		<Route path="login" name="login" component={Login}></Route>
	</Route>
</Router>, app);