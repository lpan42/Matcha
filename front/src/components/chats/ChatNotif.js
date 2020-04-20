import React, { Fragment, useContext,useEffect,useState} from 'react'
import Spinner from '../layout/Spinner';
import UserContext from '../../contexts/user/userContext';
import ChatContext from '../../contexts/chat/chatContext';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import toUpperCase from '../../utils/toUpperCase';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageAvatars from '../badges/ImageAvatars';
import ChatRoomModal from '../chats/ChatRoomModal';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '100vw',
      overflow: 'auto', 
      maxHeight:'75vh',
      backgroundColor: theme.palette.background.paper,
    },
}));

const ChatNotif = () => {
    const  userContext = useContext(UserContext);
    const chatContext = useContext(ChatContext);

    const { loadUser, user } = userContext;
    const { getFriendsList, getChatNotif, readChatNotif, chatNotif, loading, } = chatContext;

    const notif_message = [];
    const [activeChatroom, setActiveChatroom] = useState(null);
    const [showChatroom, setShowChatroom] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        loadUser();
        getFriendsList();
        getChatNotif(user && user.data.id);
        //eslint-disable-next-line
      }, [user]);

    if (loading) return <Spinner />;

    const showChatroomModal =(id_chatroom) => {
        setActiveChatroom(id_chatroom);
        // readChatNotif(id_chatroom);
        setShowChatroom(true);
    }

    chatNotif && chatNotif.map((message, key) => {
        let primary = `${toUpperCase(message.firstname)} ${toUpperCase(message.lastname)} sent you a message`;
        let secondary = `on ${message.time}`
        notif_message.push(
            <ListItem key={key} style={{color:"var(--primary-color)"}}>
                <ListItemAvatar>
                    <ImageAvatars userid={message.id_sender}/>
                </ListItemAvatar>
                    <ListItemText 
                        primary={primary}
                        secondary={secondary}
                    />
                <button className="btn-sm btn-primary" onClick={()=>showChatroomModal(message.id_chatroom)}>
                    Send a Message
                </button> 
                {showChatroom ? 
                    <ChatRoomModal 
                        show={showChatroom} 
                        handleClose={()=>setShowChatroom(false)} 
                        activeChatroom={activeChatroom}
                    /> : null}
            </ListItem>
        );
    });
    
    return (
        <Fragment>
            <List className={classes.root}>
                { chatNotif && chatNotif.length ? notif_message : 
                <p className="text-center">You dont have any new message</p>}
            </List>
        </Fragment>
    )
}

export default ChatNotif;