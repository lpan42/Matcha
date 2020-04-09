import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import UserContext from '../../contexts/user/userContext';
import Spinner from '../layout/Spinner';
import ImageAvatars from '../badges/ImageAvatars';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { toast } from 'react-toastify';
import toUpperCase from '../../utils/toUpperCase';
import ChatRoomModal from '../chats/ChatRoomModal';
import ChatContext from '../../contexts/chat/chatContext';
const FriendsList = () => {
   
    const  userContext = useContext(UserContext);
    const chatContext = useContext(ChatContext);

    const { loadUser } = userContext;
    const { friendsList, getFriendsList,loading } = chatContext;
    
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

    if(friendsList.length){
        friendsList.map((friend, key) => {
            let primary = 
                `${toUpperCase(friend.firstname)}
                 ${toUpperCase(friend.lastname)}
                `;
            friends.push(
                <ListItem key={key} color="primary">
                    <ListItemAvatar>
                        <ImageAvatars avatarPath={friend.avatar}/>
                    </ListItemAvatar>
                        <ListItemText primary={primary}/>
                    <button className="btn-sm btn-primary" onClick={()=>showChatroomModal(friend.id_chatroom)}>
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
    }

    return (
        <div>
            <p className="large">My Friends</p>
            <div>
                <List>
                    {friendsList.length ? 
                        friends : 
                        <p className="text-center">You have not had any friend yet, go and like others.</p>}
                </List>
            </div>
        </div>
    )
}

export default FriendsList;