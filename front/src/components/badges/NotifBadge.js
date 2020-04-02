import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
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
    notif && notif.data.map((message) => {
    if(!message.readed)
        nbr++;
    });

    return (
        <div className={classes.root}>
            <Badge badgeContent={nbr} max={99} color="secondary" showZero><MailIcon /></Badge>
        </div>
    );
}

export default NotifBadge;