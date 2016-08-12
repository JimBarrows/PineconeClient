import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {UserEventNames} from "../constants";
import {withRouter} from "react-router";
import UserStore from "../stores/UserStore";

export default withRouter(class Layout extends React.Component {
	constructor() {
		super();
		this.state          = {
			title: "Pinecone"
		};
		this.userLoggedIn   = this.userLoggedIn.bind(this);
		this.userLoggedOut  = this.userLoggedOut.bind(this);
		this.userRegistered = this.userRegistered.bind(this);
	}

	componentWillMount() {
		UserStore.on(UserEventNames.USER_LOGGED_IN, this.userLoggedIn);
		UserStore.on(UserEventNames.USER_LOGGED_OUT, this.userLoggedOut);
		UserStore.on(UserEventNames.REGISTER_USER_SUCCESS, this.userRegistered);
	}

	componentWillUnmount() {
		UserStore.removeListener(UserEventNames.USER_LOGGED_IN, this.userLoggedIn);
		UserStore.removeListener(UserEventNames.USER_LOGGED_OUT, this.userLoggedOut);
		UserStore.removeListener(UserEventNames.REGISTER_USER_SUCCESS, this.userRegistered);
	}

	userLoggedIn() {
		this.setState({
			user: UserStore.user()
		});
		this.props.router.push('/');
	}

	userLoggedOut() {
		this.setState({
			user: null
		});
		this.props.router.push('/login');
	}

	userRegistered() {
		this.setState({
			user: UserStore.user()
		});
		this.props.router.push('/settings');
	}

	render() {
		const containerStyle = {
			marginTop: "60px"
		};
		const {location} = this.props;
		return (
				<div class="container" role="main" style={containerStyle}>
					<Header location={location} title={this.state.title}/>
					{this.props.children}
					<Footer/>
				</div>
		);
	}
});
