import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./style/App.css";
import Header from "./components/layout/Header";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Index from './components/layout/index';

import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './contexts/auth/Authstate';
import AlertState from './contexts/alert/AlertState';


const App = () => {
	return (
		<AuthState>
		<AlertState>
			<Router>
			<Fragment>
				<Header />
				<div className="container">
					<Alert />
					<Switch>
						<PrivateRoute exact path='/' component={Index} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
					</Switch>
				</div>
			</Fragment>
			</Router>
		</AlertState>
		</AuthState>
	)
}

export default App;