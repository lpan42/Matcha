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
import toUpperCase from '../../utils/toUpperCase';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '100vw',
      overflow: 'auto', 
      maxHeight:'75vh',
      backgroundColor: theme.palette.background.paper,
    },
}));

const Notifications = () => {
    const notifContext = useContext(NotifContext);
    const  userContext = useContext(UserContext);   
    const { notif, readNotif, setAllReaded, loading } = notifContext;
    const { loadUser } = userContext;
    const notif_message = [];
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        loadUser();
        //eslint-disable-next-line
      }, []);
      
    if (loading) return <Spinner />;

    const visitProfile = (id_sender, id_notif) => {
        history.push(`/profile/${id_sender}`);
        readNotif(id_notif);
    }   

    notif && notif.map((message,key) => {
        let primary = `${toUpperCase(message.firstname)} ${toUpperCase(message.lastname)} ${message.notification} you`;
        let secondary = `on ${message.notif_time}`
        notif_message.push(
            <ListItem key={key} style={message.readed ? {color:"black"} : {color:"var(--primary-color)"}}>
                <ListItemAvatar>
                <ImageAvatars 
                    username={message.username}
                    avatar={message.avatar} 
                    online={message.online}/>  
                </ListItemAvatar>
                    <ListItemText 
                        primary={primary}
                        secondary={secondary}
                    />
                <Button size="small" color="primary" variant="contained" 
                    onClick={()=>{visitProfile(message.id_sender, message.id_notif)}}>
                    Visit Profile</Button> 
            </ListItem>
        );
    })

    const renderNotif = (
        <div>
            <Fragment>{ notif_message }</Fragment>
        </div>
    )

    return (
        <Fragment>
            <Button size="small" color="primary" onClick={()=>setAllReaded()}
            >Mark All As Readed</Button>
            <List className={classes.root}>
                {notif && notif.length ? renderNotif : <p className="text-center">You dont have any new notification</p>}
            </List>
        </Fragment>
    )
}

export default Notifications
