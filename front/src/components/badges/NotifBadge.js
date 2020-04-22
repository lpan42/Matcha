import React, {useContext,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotifContext from '../../contexts/notification/notifContext';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        },
    },
}));

const NotifBadge = () => {
    const notifContext = useContext(NotifContext);
    const { notif } = notifContext;

    const classes = useStyles();
   
    let nbr = 0; 
    notif && notif.map((message) => {
    if(!message.readed)
        nbr++;
    });

    return (
        <div className={classes.root}>
            <Badge badgeContent={nbr} max={99} color="secondary" showZero>
                <NotificationsIcon />
            </Badge>
        </div>
    );
}

export default NotifBadge;