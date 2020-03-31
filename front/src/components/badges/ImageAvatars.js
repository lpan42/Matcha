import React, { Fragment, useContext }from 'react'
import Avatar from '@material-ui/core/Avatar';
import UserContext from '../../contexts/user/userContext';
  
const ImageAvatars = ({avatarPath}) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  
  return (
        <Fragment>
        {
          avatarPath
          ? <Avatar alt={user && user.data.firstname} src={`../images/${avatarPath}`}/>
          : <Avatar>{user && user.data.firstname}</Avatar>
        }
        </Fragment>
  )
}

export default ImageAvatars
