import React,{ Fragment, useState, useContext, useEffect }  from 'react';
import UserContext from '../../contexts/user/userContext';
import EditAccount from './EditAccount';
import { toast } from 'react-toastify';
import toUpperCase from '../../utils/toUpperCase';
import { makeStyles } from '@material-ui/core/styles';
import bgImage from './bg_image_account.jpg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
  bg: {
      height:"90%",
      backgroundImage: `url(${bgImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      display:"flex",
      flexDirection: "row",
      justifyContent:"center",
      alignContent:"center",
  },
  card: {
      marginTop: "2%",
      textAlign:"left",
      backgroundColor: fade("#FFFFFF", 0.6),
      height:250,
      minWidth: 250,
      maxWidth:350,
  },
  context: {
    padding: "15px",
  },
  text: {
    paddingRight: "15px",
  },
}));

const Account = () => {
  const userContext = useContext(UserContext);

  const { user, error, success, loadUser,clearSuccess, clearError } = userContext;
  const [edit, setEdit] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    loadUser();
    if(error) {
        toast.error(error);
        clearError();
    }
    if(success) {
      toast.success(success);
      clearSuccess();
    }
      //eslint-disable-next-line
  }, [error, success]);

  const onClick = () => {
      setEdit(true);  
  }

  const accountInfo = (
    <div className={classes.card}>
      <div className={classes.context}>
      <Typography variant="h4" color="primary">My Account</Typography>
          <Button color="primary" style={{float:"right"}} onClick={onClick}>Edit</Button>
          <br></br>
          <Typography variant="h6" component="span" className={classes.text}  >Firstname:</Typography>
          <Typography variant="subtitle1" component="span">{user && toUpperCase(user.data.firstname)}</Typography> 
          <br></br>
          <Typography variant="h6" component="span" className={classes.text}>Lastname:</Typography>
          <Typography variant="subtitle1" component="span">{user && toUpperCase(user.data.lastname)}</Typography>
          <br></br>
          <Typography variant="h6" component="span" className={classes.text}>Username:</Typography>
          <Typography variant="subtitle1" component="span">{user && toUpperCase(user.data.username)}</Typography> 
          <br></br>
          <Typography variant="h6" component="span" className={classes.text}>Email:</Typography>
          <Typography variant="subtitle1" component="span">{user && user.data.email}</Typography> 
      </div>
    </div>
  )

  return (
      <div className={classes.bg}>
        { !edit ? accountInfo : <EditAccount />}
      </div>
  )
}

export default Account
