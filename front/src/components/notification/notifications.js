import React, { Fragment, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import NotifContext from '../../contexts/notification/notifContext';
import UserContext from '../../contexts/user/userContext';
import Spinner from '../layout/Spinner';
import { toast } from 'react-toastify';

const Notifications = () => {
    const notifContext = useContext(NotifContext);
    const  userContext = useContext(UserContext);
    const { notif, readNotif, success, error,loading } = notifContext;
    const { loadUser } = userContext;
    const notif_message = [];
    const history = useHistory();

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
        notif_message.push(
            <li key={key} style={message.readed ? {color:"black"} : {color:"var(--primary-color)"}}>
                {message.username} {message.notification} you on {message.notif_time} 
                {message.notification === "messages" ? 
                    <button className="btn-sm btn-primary" ><a href="/" style={{color: "white"}}> Send a message</a></button> : 
                    <button className="btn-sm btn-primary" onClick={()=>{visitProfile(message.id_sender, message.id_notif)}} style={{color: "white"}}>Visit Profile</button> 
                }
            </li>
        );
    })

    const renderNotif = (
            <div>
                <Fragment>{ notif_message }</Fragment>
            </div>
    )

    return (
        <div>
            {notif && notif.data.length ? renderNotif : <p className="text-center">You dont have any new notification</p>}
        </div>
    )
}

export default Notifications
