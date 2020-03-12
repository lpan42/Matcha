//rce from es7 react extension
import React, { Fragment, useContext,useEffect } from 'react';
import PropTypes from 'prop-types';//shortcut impt 
import { Link } from 'react-router-dom';//import from default does not need {}
import UserContext from '../../contexts/user/userContext';
import NotifContext from '../../contexts/notification/notifContext';
import NotifBadge from '../badge/NotifBadge';

const Header = ({ title }) => {
    const userContext = useContext(UserContext);
    const notifContext = useContext(NotifContext);

    const { token, logout, user } = userContext;
    const { unread, get_unread_message } = notifContext;

    useEffect(() => {
        get_unread_message();
    }, []);

    const onLogout = () => {
        logout();
    }

    const authLinks = (
        <Fragment>
            <li>Hello, {user && user.data.username}
                <a href='/notif'><NotifBadge /></a>
                <a href='/account'>Account</a>
                <a href={`/profile/${user && user.data.id}`} >Profile</a>
                
            </li>
            <li>
                <a href="#!" onClick={onLogout}>Logout</a>
            </li>
        </Fragment>
    )

    return (
        <nav className='navbar bg-primary'>
            <h1><Link to='/'>{title}</Link></h1>
            <ul>{ token && authLinks }</ul>
        </nav>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header
