import Navbar           from 'bootstrap-react-components/distribution/bootstrap/components/Navbar'
import Brand            from 'bootstrap-react-components/distribution/bootstrap/components/Navbar/Brand'
import React            from "react"
import {withRouter}     from 'react-router'
import {Link}           from "react-router-dom"
import * as UserActions from "../actions/AccountActions"
import {UserEventNames} from "../constants"
import UserStore        from "../stores/UserStore"
import pinecone_clear   from "./img/pinecone_clear.png"

export default withRouter(class Header extends React.Component {

	constructor () {
		super()
		this.state         = {
			collapsed : true
			, username: null
		}
		this.userLoggedIn  = this.userLoggedIn.bind(this)
		this.userLoggedOut = this.userLoggedOut.bind(this)
	}

	componentDidMount () {
		UserStore.on(UserEventNames.USER_LOGGED_IN, this.userLoggedIn)
		UserStore.on(UserEventNames.USER_LOGGED_OUT, this.userLoggedOut)
	}

	componentWillUnmount () {
		UserStore.removeListener(UserEventNames.USER_LOGGED_IN, this.userLoggedIn)
		UserStore.removeListener(UserEventNames.USER_LOGGED_OUT, this.userLoggedOut)
	}

	userLoggedIn () {
		this.setState({
										username: UserStore.user()
									})
	}

	userLoggedOut () {
		this.setState({
										username: null
									})
	}

	toggleCollapse () {
		let collapsed = !this.state.collapsed
		this.setState({collapsed})
	}

	logout () {
		UserActions.logout()
	}

	render () {
		let {collapsed, username} = this.state
		const navClass            = collapsed ? "collapse" : ""
		const {location}          = this.props
		const campaignClass       = location.pathname === "/" ? "active" : ""
		const contentClass        = location.pathname.match(/^\/content/) ? "active" : ""
		const registerClass       = location.pathname.match(/^\/register/) ? "active" : ""
		const loginClass          = location.pathname.match(/^\/login/) ? "active" : ""
		let UserComponent         = null
		if (username) {
			UserComponent = (
				<ul class = "nav navbar-nav navbar-right" >
					<li ><p class = "navbar-text" >{username}</p ></li >
					<li ><Link to = "settings" ><span class = "glyphicon glyphicon-cog" aria-hidden = "true" ></span ></Link >
					</li >
					<li >
						<a onClick = {this.logout.bind(this)} >
									<span
										class = "glyphicon glyphicon-off" aria-hidden = "true" ></span ></a >
					</li >
				</ul >)
		} else {
			UserComponent = (
				<ul class = "nav navbar-nav navbar-right" >
					<li class = {registerClass} ><Link id = "registerLink" to = "/register" >Register</Link ></li >
					<li class = {loginClass} ><Link id = "loginLink" to = "login" >Login</Link ></li >
				</ul >
			)
		}
		return (
			<Navbar id = {'app-header'} background = {'dark'} theme = {'dark'} >
				<Brand id = {'app-header'} onClick = {() => this.props.history.push('/')} >
					<img alt = "Brand" src = {pinecone_clear} height = {50} width = {50} />
				</Brand >
				{/*<NavbarItem active={true} id={'campaigns'}>Campaigns</NavbarItem>*/}
				{/*<div id = "navbar" class = {"navbar-collapse " + navClass} >*/}
				<ul class = "nav navbar-nav" >
					<li class = {campaignClass} ><Link id = 'campaignLink' to = "/" >Campaigns</Link ></li >
				</ul >
				{UserComponent}
				{/*</div >*/}
			</Navbar >
		)
	}
})
