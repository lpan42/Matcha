import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import UserContext from '../../contexts/user/userContext';
import Spinner from '../layout/Spinner';
import ImageAvatars from '../badges/ImageAvatars';
import UnblockComfirm from '../modals/UnblockComfirm';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import Divider from '@material-ui/core/Divider';

const FriendsList = () => {
    const  userContext = useContext(UserContext);
    const { loadUser } = userContext;

    useEffect(() => {
            loadUser();
        //eslint-disable-next-line
      }, []);
    
    return (
        <div>
            <p className="large">My Friends</p>
        </div>
    )
}

export default FriendsList;