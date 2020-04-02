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
import Blocklist from './components/profile/Blocklist';
//state
import UserState from './contexts/user/UserState';
import ProfileState from './contexts/profile/ProfileState';
import NotifState from './contexts/notification/NotifState';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

toast.configure({
	position: "bottom-left",
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: false,
	pauseOnHover: true,
	draggable: false,
  });

  const theme = createMuiTheme({
	palette: {
	  primary: {
		main: '#60A561',
	  },
	  secondary: {
		main: '#F6BD60',
	  },
	  error: {
		main: '#B33951',
	  },
	  success: {
		main: '#60A561',
	  },
	  warning:  {
		main: '#F6BD60',
	  },
	  info: {
		  main: '#38618C',
	  }
	},
  });
  
const App = () => {
	
	return (
		<UserState>
		<ProfileState>
		<NotifState>
			<Router>
			<ThemeProvider theme={theme}>
				<Fragment>
					<Header title ="Matcha"/>
					<div className="container">
						<Switch>
							<PrivateRoute exact path='/' component={Index} />
							<PrivateRoute exact path='/account' component={Account} />
							<PrivateRoute exact path='/profile/:userid' component={Profile} />
							<PrivateRoute exact path='/blocklist/:userid' component={Blocklist} />
							<PrivateRoute exact path='/notif' component={notifications} />
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</Fragment>
			</ThemeProvider>
			</Router>
		</NotifState>
		</ProfileState>
		</UserState>
	)
}

export default App;