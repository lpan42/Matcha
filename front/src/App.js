import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./style/App.css";
import PrivateRoute from './components/routing/PrivateRoute';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//components
import Header from "./components/layout/Header";
import Register from './components/user/Register';
import Login from './components/user/Login';
import Index from './components/layout/index';
import Account from './components/user/Account';
import Profile from './components/profile/Profile';
import NotFound from './components/layout/NotFound';
import notifications from './components/notification/notifications';

//state
import UserState from './contexts/user/UserState';
import ProfileState from './contexts/profile/ProfileState';
import NotifState from './contexts/notification/NotifState';

toast.configure({
	position: "bottom-left",
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: false,
	pauseOnHover: true,
	draggable: false,
  });

const App = () => {
	return (
		<UserState>
		<ProfileState>
		<NotifState>
			<Router>
				<Fragment>
					<Header title ="Matcha"/>
					<div className="container">
						<Switch>
							<PrivateRoute exact path='/' component={Index} />
							<PrivateRoute exact path='/account' component={Account} />
							<PrivateRoute exact path='/profile/:userid' component={Profile} />
							<PrivateRoute exact path='/notif' component={notifications} />
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</Fragment>
			</Router>
		</NotifState>
		</ProfileState>
		</UserState>
	)
}

export default App;