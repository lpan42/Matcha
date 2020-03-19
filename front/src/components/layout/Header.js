//rce from es7 react extension
import React, { Fragment, useContext,useEffect } from 'react';
import PropTypes from 'prop-types';//shortcut impt 
import { Link } from 'react-router-dom';//import from default does not need {}
import UserContext from '../../contexts/user/userContext';
import NotifContext from '../../contexts/notification/notifContext';
import ProfileContext from '../../contexts/profile/profileContext';
import NotifBadge from '../badge/NotifBadge';
import ImageAvatars from '../badge/ImageAvatars';


const Header = ({ title }) => {
    const userContext = useContext(UserContext);
    const notifContext = useContext(NotifContext);
    const  profileContext = useContext(ProfileContext);

    const { token, logout, user } = userContext;
    const { getProfile, clearProfile} = profileContext;
    const { getNotif, clearNotif } = notifContext;

    useEffect(() => {
        if(user){
            getNotif();
            getProfile(user && user.data.id);
        }
        //eslint-disable-next-line
    }, [user]);

    const onLogout = () => {
        logout();
        clearNotif();
        clearProfile();
    }

    const authLinks = (
        <Fragment>
            <li><ImageAvatars />
                <a href='/notif'><NotifBadge /></a>
                <a href='/account'>Account</a>
                <a href={`/profile/${user && user.data.id}`} >Profile</a>
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
