import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from '../../contexts/user/userContext';
import ChatContext from '../../contexts/chat/chatContext';
import Spinner from '../layout/Spinner';
import ImageAvatars from '../badges/ImageAvatars';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import toUpperCase from '../../utils/toUpperCase';
import ChatRoomModal from '../chats/ChatRoomModal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const FriendsList = () => {
    const  userContext = useContext(UserContext);
    const chatContext = useContext(ChatContext);
    const history = useHistory();
    const { loadUser } = userContext;
    const { friendsList, getFriendsList, clearChatMsgs, loading } = chatContext;
    
    const [showChatroom, setShowChatroom] = useState(false);
    const [activeChatroom, setActiveChatroom] = useState(null);

    const friends = [];

    useEffect(() => {
        loadUser();
        getFriendsList();
        //eslint-disable-next-line
      }, []);

    if (loading) return <Spinner />;
    
    const showChatroomModal =(id_chatroom) => {
        setActiveChatroom(id_chatroom);
        setShowChatroom(true);
    }

    const closeChatroomModal = () => {
        clearChatMsgs();
        setShowChatroom(false);
    }

    const visitProfile = (id_user) => {
        history.push(`/profile/${id_user}`);
    }   

    friendsList && friendsList.map((friend, key) => {
        let primary = 
            `${toUpperCase(friend.firstname)}
            ${toUpperCase(friend.lastname)}
            `;
        friends.push(
            <ListItem key={key} color="primary">
                <ListItemAvatar>
                    <ImageAvatars 
                        username={friend.username}
                        avatar={friend.avatar} 
                        online={friend.online}/>  
                </ListItemAvatar>
                    <ListItemText primary={primary}/>
                <Button color="primary" variant="contained" size="small" 
                    style={{margin:"4px"}}
                    onClick={()=>{visitProfile(friend.id_user)}}>
                    Visit Profile
                </Button>
                <Button color="primary" variant="contained" size="small" 
                    style={{margin:"4px"}}
                    onClick={()=>showChatroomModal(friend.id_chatroom)}>
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
        return friends;
    });

    return (
        <div className="container">
            <div style={{maxWidth:"600px", margin:"auto"}}>
            <Typography variant="h5" color="primary"style={{marginBottom:"10px"}}>My Friends</Typography>
                <List>
                    {friendsList && friendsList.length ? 
                        friends : 
                        <p className="text-center">You have not had any friend yet, go and like others.</p>}
                </List>
            </div>
        </div>
    )
}

export default FriendsList;