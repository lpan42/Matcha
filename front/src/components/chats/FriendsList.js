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

const FriendsList = () => {
    const  userContext = useContext(UserContext);
    const { loadUser } = userContext;

    const [friendsList, setFriendsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);
    const friends = [];

    const getFriendsList = async () => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get('/user/friendslist');
            setFriendsList(result.data.data);
            setLoading(false);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        loadUser();
        getFriendsList();
        if(success) {
            toast.success(success);
        }
        //eslint-disable-next-line
      }, [success]);

    if (loading) return <Spinner />;
    
    const getChatroom = (id_user) => {
        console.log(id_user)
    }

    if(friendsList.length){
        console.log(friendsList)
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
                        <ListItemText
                            primary={primary}
                        />
                    <button className="btn-sm btn-primary"
                            onClick={()=>{getChatroom(friend.id_user)}}
                        >
                        Send a Message
                    </button>
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