import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./style/App.css";
import PrivateRoute from './components/routing/PrivateRoute';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Register from './components/user/Register';
import Login from './components/user/Login';
import Index from './components/index/index';
import Account from './components/user/Account';
import Profile from './components/profile/Profile';
import NotFound from './components/layout/NotFound';
import notifications from './components/notification/notifications';
import History from './components/profile/History';
import Friendslist from './components/chats/FriendsList';
import ChatNotif from './components/chats/ChatNotif';
import RequestResetPwd from './components/user/RequestResetPwd';
import ActiveAccount from "./components/user/ActiveAccount";
import ResetPwd from "./components/user/ResetPwd";
//state
import UserState from './contexts/user/UserState';
import ProfileState from './contexts/profile/ProfileState';
import NotifState from './contexts/notification/NotifState';
import ChatState from './contexts/chat/ChatState';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

toast.configure({
	position: "bottom-left",
	autoClose: 3000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: false,
  });

  const theme = createMuiTheme({
	palette: {
	  primary: {
		main: '#60A561',
		contrastText: '#ffffff',
	  },
	  secondary: {
		main: '#F6BD60',
		contrastText: '#ffffff',
	  },
	  error: {
		main: '#B33951',
		contrastText: '#ffffff',
	  },
	  success: {
		main: '#60A561',
		contrastText: '#ffffff',
	  },
	  warning:  {
		main: '#F6BD60',
		contrastText: '#ffffff',
	  },
	  info: {
		contrastText: '#ffffff',
		main: '#38618C',
	  },
	},
	typography: {
		fontFamily: "'Montserrat', sans-serif",
		textTransform: "none",
	  }
  });
  
const App = () => {
	return (
		<UserState>
		<ProfileState>
		<NotifState>
		<ChatState>
			<Router>
			<ThemeProvider theme={theme}>
				<Fragment>
					<Header title ="Matcha"/>
					<div style={{minHeight:"100vh"}}>
						<Switch>
							<PrivateRoute exact path='/' component={Index} />
							<PrivateRoute exact path='/account' component={Account} />
							<PrivateRoute exact path='/profile/:userid' component={Profile} />
							<PrivateRoute exact path='/history' component={History} />
							<PrivateRoute exact path='/friendslist' component={Friendslist} />
							<PrivateRoute exact path='/notif' component={notifications} />
							<PrivateRoute exact path='/chat' component={ChatNotif} />
							<Route exact path='/register' component={Register} />
							<Route exact path="/register/:active_link" component={ActiveAccount} />
							<Route exact path="/resetpwd_request" component={RequestResetPwd} />
							<Route exact path="/resetpwd/:resetpwd_link" component={ResetPwd} />
							<Route exact path='/login' component={Login} />
							<Route component={NotFound} />
						</Switch>
					</div>
					<Footer />
				</Fragment>
			</ThemeProvider>
			</Router>
		</ChatState>
		</NotifState>
		</ProfileState>
		</UserState>
	)
}

export default App;