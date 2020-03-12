import React, { Fragment, useContext, useEffect } from 'react';
import NotifContext from '../../contexts/notification/notifContext';
import AlertContext from '../../contexts/alert/alertContext';

const Unread = () => {
    const notifContext = useContext(NotifContext);
    const alertContext = useContext(AlertContext);

    const { unread, clearNotif, clearMessage, success, error } = notifContext;
    const { setAlert } = alertContext;
    const notif = [];

    useEffect(() => {
        if(error) {
            setAlert(error, 'danger');
            clearMessage();
        }
        if(success) {
        setAlert(success, 'success');
        clearMessage();
        }
        //eslint-disable-next-line
      }, [error, success]);

    const OnClick = () => {
        clearNotif();
    }

    unread && unread.data.map((message,key) => {
        notif.push(
            <li key={key}>
                {message.username} {message.notification} you on {message.notif_time} 
                {message.notification === "messages" ? 
                    <button className="btn-sm btn-primary"><a href="/" style={{color: "white"}}> Go Our Chatroom</a></button> :
                    <button className="btn-sm btn-primary"><a href={`/profile/${message.id_sender}`} style={{color: "white"}}>Visit Profile</a></button> 
                }
            </li>
        );
    })

    const renderNotif = (
            <div>
                <button className="" onClick={OnClick}>Clear all</button>
                <Fragment>{ notif }</Fragment>
            </div>
    )

    return (
        <div>
            {unread && unread.data.length ? renderNotif : <p className="text-center">You dont have any new notification</p>}
        </div>
    )
}

export default Unread
