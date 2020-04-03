import React, { useContext, useEffect, useState } from 'react'
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
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));


const Blocklist = () => {
    const  userContext = useContext(UserContext);
    const { loadUser } = userContext;

    const [blockList, setBlockList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);
    const [showUnblock, setShowUnblock] = useState(false);

    const classes = useStyles();
    const blocks = [];

    const getBlockList = async () => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get('/user/blocklist');
            setBlockList(result.data.data);
            setLoading(false);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        loadUser();
        getBlockList();
        if(success) {
            toast.success(success);
        }
        //eslint-disable-next-line
      }, [success]);
    
    if (loading) return <Spinner />;
    
    const showUnblockComfirm = () => {
        setShowUnblock(true);
    }
  
    if(blockList.length){
        blockList.map((blockUser, key) => {
            blocks.push(
                <ListItem key={key} color="primary">
                    <ListItemAvatar>
                        <ImageAvatars avatarPath={blockUser.avatar}/>
                    </ListItemAvatar>
                        <ListItemText primary={blockUser.firstname}/>
                    <button className="btn-sm btn-primary"
                        onClick={showUnblockComfirm}
                    >
                        Unblock User
                    </button>
                    {showUnblock ? 
                        <UnblockComfirm 
                            show={showUnblock} 
                            handleClose={()=>setShowUnblock(false)} 
                            blockUserId={ blockUser.id_user} 
                            blockUserFirstname = {blockUser.firstname}
                            success={(data)=>setSuccess(data)}
                        /> : null}
                </ListItem>
        );
        });
    }

    return (
        <div>
            <p className="large">Blocklist</p>
            <List className={classes.root}>
                {blockList.length ? 
                    blocks : <p>Great! You did not block any user.</p>}
            </List>
        </div>
    )
}

export default Blocklist;