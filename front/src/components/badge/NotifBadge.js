import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotifContext from '../../contexts/notif/notifContext';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        },
    },
}));

const NotifBadge = () => {
    const notifContext = useContext(NotifContext);
    const { unread } = notifContext;

    const classes = useStyles();
    // const nbr = nofif.lengh;
    // console.log(nbr)
    return (
        <div className={classes.root}>
        <Badge badgeContent={4} color="primary"><MailIcon /></Badge>
        </div>
    );
}

export default NotifBadge;