import React, { useState, useEffect }from 'react'
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import Badge from '@material-ui/core/Badge';
import {withStyles } from '@material-ui/core/styles';

const ImageAvatars = ({ userid }) => {
  
  const[username, setUsername] = useState(null);
  const[avatar, setAvatar] = useState(null);
  const[online, setOnline] = useState(false);
  
  const getAccount = async () => {
    setAuthToken(localStorage.token);
    try{
        const result =  await axios.get(`/user/account/${userid}`);
        setUsername(result.data.data.username);
        setAvatar(result.data.data.avatar[0].avatar);
        setOnline(result.data.data.online);
    }catch(err){
        console.log(err);
    }
  }

  useEffect(() => {
    if(userid)
      getAccount();
    //eslint-disable-next-line
  }, [userid]);

  const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: () => {return (online ? theme.palette.primary.main : theme.palette.error.main);},
        border:'1px solid white',
    },
    '@keyframes ripple': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  }))(Badge);
  
  return (
    <StyledBadge overlap="circle" variant="dot" anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      >
      { avatar ? 
        <Avatar alt={username} src={`../images/${avatar}`}/> :
        <Avatar>{username}</Avatar>
      }
    </StyledBadge>
  );
}

export default ImageAvatars
