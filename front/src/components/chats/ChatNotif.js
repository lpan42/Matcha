import React, {useContext,useEffect,useState} from 'react'
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

const ChatNotif = () => {
    const userContext = useContext(UserContext);
    const chatContext = useContext(ChatContext);

    const { loadUser } = userContext;
    const { getFriendsList, getChatNotif,chatNotif, loading, clearChatMsgs } = chatContext;

    const [activeChatroom, setActiveChatroom] = useState(null);
    const [showChatroom, setShowChatroom] = useState(false);

    const notif_message = [];
    const classes = useStyles();

    useEffect(() => {
        loadUser();
        getChatNotif();
        getFriendsList();
        //eslint-disable-next-line
      },[]);

    const showChatroomModal =(id_chatroom) => {
        setActiveChatroom(id_chatroom);
        setShowChatroom(true);
    }
    const closeChatroomModal = () => {
        clearChatMsgs();
        setShowChatroom(false);
    }

    chatNotif && chatNotif.map((message, key) => {
        let primary = `${toUpperCase(message.firstname)} ${toUpperCase(message.lastname)} sent you a message`;
        let secondary = `on ${message.time}`
        notif_message.push(
            <ListItem key={key}  style={message.readed ? {color:"black"} : {color:"var(--primary-color)"}}>
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
                <Button color="primary" variant="contained" size="small" style={{margin:"4px"}}
                    onClick={()=>showChatroomModal(message.id_chatroom)}>
                    Send a Message
                </Button>
                {showChatroom ? 
                    <ChatRoomModal 
                        show={showChatroom} 
                        handleClose={closeChatroomModal}
                        activeChatroom={activeChatroom}
                    /> : null}
            </ListItem>
        );
       return notif_message;
    });
    
    if (loading) return <Spinner />;

    return (
        <div className="container">
            <div style={{maxWidth:"600px", margin:"auto"}}>
                <List className={classes.root}>
                    { (chatNotif && chatNotif.length) ? 
                        notif_message :
                        <p className="text-center">You dont have any new message</p>}
                </List>
            </div>
        </div>
    )
}

export default ChatNotif;