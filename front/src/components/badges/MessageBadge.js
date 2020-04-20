import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ChatContext from '../../contexts/chat/chatContext';
import SmsIcon from '@material-ui/icons/Sms';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        },
    },
}));

const MessageBadge = () => {
    const chatContext = useContext(ChatContext);
    const { chatNotif } = chatContext;

    const classes = useStyles();
   
    let nbr = 0; 
    chatNotif && chatNotif.map((message) => {
    if(!message.readed)
        nbr++;
    });
    
    return (
        <div className={classes.root}>
            <Badge badgeContent={nbr} max={99} color="secondary" showZero><SmsIcon /></Badge>
        </div>
    );
}

export default MessageBadge;