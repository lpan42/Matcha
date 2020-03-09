import React, { Fragment, useContext,useEffect } from 'react';
import UserContext from '../../contexts/user/userContext';
import NotifContext from '../../contexts/notif/notifContext';

const Unread = () => {
    const userContext = useContext(UserContext);
    const notifContext = useContext(NotifContext);

    const { unread } = notifContext;
    const unread_list = unread;
    const notif =[];
    for(const key in unread_list){
        
        // notif.push(<li key={key}>{ unread_list.data[key].username} {unread_list.data[key].notification} you on {unread_list.data[key].notif_time}</li>);
    }

    return (
        <Fragment>{ notif }</Fragment>
    )
}

export default Unread
