import React, { useState, useEffect }from 'react'
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import Badge from '@material-ui/core/Badge';
import {withStyles } from '@material-ui/core/styles';

const ImageAvatars = ({ username, avatar, online }) => {

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
