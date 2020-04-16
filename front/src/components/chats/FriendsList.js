import React, { useContext, useEffect, useState } from 'react';
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

const FriendsList = () => {
   
    const  userContext = useContext(UserContext);
    const chatContext = useContext(ChatContext);

    const { loadUser } = userContext;
    const { friendsList, getFriendsList, loading } = chatContext;
    
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

    friendsList && friendsList.map((friend, key) => {
        let primary = 
            `${toUpperCase(friend.firstname)}
                ${toUpperCase(friend.lastname)}
            `;
        friends.push(
            <ListItem key={key} color="primary">
                <ListItemAvatar>
                    <ImageAvatars userid={friend.id_user}/>
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

    return (
        <div>
            <p className="large">My Friends</p>
            <div>
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