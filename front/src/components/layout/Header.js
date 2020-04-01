//rce from es7 react extension
import React, { Fragment, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';//shortcut impt 
import { Link } from 'react-router-dom';//import from default does not need {}
import UserContext from '../../contexts/user/userContext';
import NotifContext from '../../contexts/notification/notifContext';
import ProfileContext from '../../contexts/profile/profileContext';
import NotifBadge from '../badges/NotifBadge';
import ImageAvatars from '../badges/ImageAvatars';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));

const Header = ({ title }) => {
    const userContext = useContext(UserContext);
    const notifContext = useContext(NotifContext);
    const profileContext = useContext(ProfileContext);

    const { token, logout, user } = userContext;
    const { clearProfile } = profileContext;
    const { getNotif, clearNotif } = notifContext;

    useEffect(() => {
        if(token){
            getNotif();
        }
        //eslint-disable-next-line
    }, [token]);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onLogout = () => {
        clearNotif();
        clearProfile();
        logout();
    }

    const authLinks = (
        <Fragment>
            <Button  ref={anchorRef} onClick={handleToggle}>
                <ImageAvatars avatarPath={user && user.data.avatar[0].avatar}/>
            </Button>
            <Popper open={open} anchorEl={anchorRef.current}>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} >
                        <MenuItem><a href='/account'>Account</a></MenuItem>
                        <MenuItem><a href={`/profile/${user && user.data.id}`} >Profile</a></MenuItem>
                        <MenuItem><a href={`/profile/${user && user.data.id}`} >Friends</a></MenuItem>
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
            <a href='/notif'><NotifBadge /></a>
            <Button href="#!" onClick={onLogout}><ExitToAppIcon style={{ color:"white" }}/></Button>
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
