import React, {Fragment, useContext, useEffect} from 'react';
import UserContext from '../../contexts/user/userContext';
import { makeStyles } from '@material-ui/core/styles';
import bgImage from './bg_image_account.jpg';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const useStyles = makeStyles(theme => ({
    card: {
        marginTop: "2%",
        textAlign:"center",
        backgroundColor: fade("#FFFFFF", 0.6),
        height:270,
        minWidth: 250,
        maxWidth:350,
        padding: "15px",
    },
    form: {
        "& .MuiTextField-root": {
            margin: theme.spacing(0.8),
            width: "20ch",
          }
    },
  }));
  
const EditAccount = () => {
    const userContext = useContext(UserContext);
    const { user, editAccount } = userContext;
    const classes = useStyles();

    const onSubmit =(e) => {
    e.preventDefault();
        editAccount(user);
    }

    return (
        <div className={classes.card}>
            <Typography variant="h4" color="primary">My Account</Typography>
            <form className={classes.form} onSubmit={onSubmit}>
                <TextField id="firstname" label="firstname" style = {{width: 110}}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <FaceIcon fontSize="small" color="primary"/>
                        </InputAdornment>
                        ),
                    }}
                    type="text" size="small" placeholder={user && user.data.firstname} 
                    onChange={e => user.data.firstname = e.target.value.toLowerCase()}
                />
                <TextField id="lastname" label="lastname" style = {{width: 110}}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <FaceIcon fontSize="small" color="primary"/>
                        </InputAdornment>
                        ),
                    }}
                    type="text" size="small" placeholder={user && user.data.lastname} 
                    onChange={e => user.data.lastname = e.target.value.toLowerCase()}
                />
                <TextField id="username" label="username" style = {{width: 240}}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <FaceIcon fontSize="small" color="primary"/>
                        </InputAdornment>
                        ),
                    }}
                    type="text" size="small" placeholder={user && user.data.username} 
                    onChange={e => user.data.username = e.target.value.toLowerCase()}
                />
                <TextField id="email" label="email" style = {{width: 240}}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <MailOutlineIcon fontSize="small" color="primary"/>
                        </InputAdornment>
                        ),
                    }}
                    type="email" size="small"  placeholder={user && user.data.email} 
                    onChange={e => user.data.email = e.target.value.toLowerCase()}
                />
                <br></br>
                <Button type="submit" color="primary">Comfirm</Button>
            </form>
        </div>
    )
}

export default EditAccount
