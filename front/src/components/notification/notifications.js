import React, { Fragment, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import NotifContext from '../../contexts/notification/notifContext';
import UserContext from '../../contexts/user/userContext';
import Spinner from '../layout/Spinner';
import ImageAvatars from '../badges/ImageAvatars';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
}));
  
const Notifications = () => {
    const notifContext = useContext(NotifContext);
    const  userContext = useContext(UserContext);
    const { notif, readNotif, success, error,loading } = notifContext;
    const { loadUser } = userContext;
    const notif_message = [];
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        loadUser();
        if(error) {
            toast.error(error);
        }
        if(success) {
            toast.success(success);
        }
        //eslint-disable-next-line
      }, [error, success]);
      
    if (loading) return <Spinner />;

    const visitProfile = (id_sender, id_notif) => {
        history.push(`/profile/${id_sender}`);
        readNotif(id_notif);
    }   

    notif && notif.data.map((message,key) => {
        let primary = `${message.firstname} ${message.notification} you`;
        let secondary = `on ${message.notif_time}`
        notif_message.push(
            <ListItem key={key} style={message.readed ? {color:"black"} : {color:"var(--primary-color)"}}>
                <ListItemAvatar>
                        <ImageAvatars avatarPath={message.avatar}/>
                </ListItemAvatar>
                    <ListItemText 
                        primary={primary}
                        secondary={secondary}
                    />
            {message.notification === "messages" ? 
                <button className="btn-sm btn-primary" ><a href="/"> Send a message</a></button> : 
                <button className="btn-sm btn-primary" onClick={()=>{visitProfile(message.id_sender, message.id_notif)}}>Visit Profile</button> 
            }
            </ListItem>
        );
    })

    const renderNotif = (
        <div>
            <Fragment>{ notif_message }</Fragment>
        </div>
    )

    return (
        <List className={classes.root}>
            {notif && notif.data.length ? renderNotif : <p className="text-center">You dont have any new notification</p>}
        </List>
    )
}

export default Notifications
