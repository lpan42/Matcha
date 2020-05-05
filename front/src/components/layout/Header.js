//rce from es7 react extension
import React, { Fragment, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';//shortcut impt 
import { Link } from 'react-router-dom';//import from default does not need {}
import UserContext from '../../contexts/user/userContext';
import NotifContext from '../../contexts/notification/notifContext';
import ProfileContext from '../../contexts/profile/profileContext';
import NotifBadge from '../badges/NotifBadge';
import MessageBadge from '../badges/MessageBadge';
import ImageAvatars from '../badges/ImageAvatars';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChatContext from '../../contexts/chat/chatContext';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    logo: {
        display:"flex",
        flexDirection: "column",
        justifyContent:"flex-start",
        alignContent:"left",
    },
}));

const Header = ({ title }) => {
    const userContext = useContext(UserContext);
    const notifContext = useContext(NotifContext);
    const profileContext = useContext(ProfileContext);
    const chatContext = useContext(ChatContext);
    
    const { token, logout, user } = userContext;
    const { clearProfile } = profileContext;
    const { getNotif, clearNotif } = notifContext;
    const { getChatNotif, clearChat } = chatContext;
    const classes = useStyles();

    useEffect(() => {
        if(token && user){
            getNotif();
            getChatNotif(user && user.data.id);
        }
        //eslint-disable-next-line
    }, [token, user]);
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
        clearChat();
        logout();
    }

    const authLinks = (
        <Fragment>
            <Button  ref={anchorRef} onClick={handleToggle}>
                <ImageAvatars 
                    username={user&&user.data.username}
                    avatar={user&&user.data.avatar} 
                    online={user&&user.data.online}/>  
            </Button>
            <Popper open={open} anchorEl={anchorRef.current}>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} >
                        <MenuItem><a href='/account'>My Account</a></MenuItem>
                        <MenuItem><a href={`/profile/${user && user.data.id}`} >My Profile</a></MenuItem>
                        <MenuItem><a href={`/history`} >My History</a></MenuItem>
                        <MenuItem><a href={`/friendslist`} >My Friends</a></MenuItem>
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
            <Button href='/notif'><NotifBadge /></Button>
            <Button href='/chat'><MessageBadge /></Button>
            <Button href="#!" onClick={onLogout}><ExitToAppIcon /></Button>
        </Fragment>
    )

    return (
        <nav className='navbar bg-primary'>
            <div className={classes.logo}>
                <Typography variant="h4"><Link to='/'>{title}</Link></Typography>
                <Typography variant="caption">At here, Love will find you</Typography>
            </div>
            
            <ul>{ token && authLinks }</ul>
        </nav>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header
