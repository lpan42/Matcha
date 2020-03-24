import React, { useContext }from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import UserContext from '../../contexts/user/userContext';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  
const ImageAvatars = ({avatarPath}) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  // const ImageAvatar = user && user.data.avatar[0].avatar;
  const classes = useStyles();
  return (
        <div className={classes.root}>
        {
          avatarPath
          ? <Avatar alt={user && user.data.firstname} src={`../images/${avatarPath}`}/>
          : <Avatar>{user && user.data.firstname}</Avatar>
        }
            
        </div>
  )
}

export default ImageAvatars
