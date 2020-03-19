import React, {useContext}from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ProfileContext from '../../contexts/profile/profileContext';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  
const ImageAvatars = () => {
  const  profileContext = useContext(ProfileContext);
  const { profile } = profileContext;
  const picture = profile && profile.data.picture;
  const classes = useStyles();
  return (
        <div className={classes.root}>
        {
          picture
          ? <Avatar alt={profile && profile.data.firstname} src={`../images/${profile && profile.data.picture}`}/>
          : <Avatar>{profile && profile.data.firstname}</Avatar>
        }
            
        </div>
  )
}

export default ImageAvatars
