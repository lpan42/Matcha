import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./style/App.css";
import PrivateRoute from './components/routing/PrivateRoute';
//components
import Header from "./components/layout/Header";
import Register from './components/user/Register';
import Login from './components/user/Login';
import Alert from './components/layout/Alert';
import Index from './components/layout/index';
import Account from './components/user/Account';
import Profile from './components/profile/Profile';
import NotFound from './components/layout/NotFound';
import Unread_list from './components\/notification/Unread_list';

//state
import UserState from './contexts/user/UserState';
import AlertState from './contexts/alert/AlertState';
import ProfileState from './contexts/profile/ProfileState';
import NotifState from './contexts/notif/NotifState';

const App = () => {
	return (
		<UserState>
		<ProfileState>
		<AlertState>
		<NotifState>
			<Router>
			<Fragment>
				<Header title ="Matcha"/>
				<div className="container">
					<Alert />
					<Switch>
						<PrivateRoute exact path='/' component={Index} />
						<PrivateRoute exact path='/account' component={Account} />
						<PrivateRoute exact path='/profile/:userid' component={Profile} />
						<PrivateRoute exact path='/notif' component={Unread_list} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</Fragment>
			</Router>
		</NotifState>
		</AlertState>
		</ProfileState>
		</UserState>
	)
}

export default App;