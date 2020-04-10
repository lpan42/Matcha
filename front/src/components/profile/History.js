import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
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
import toUpperCase from '../../utils/toUpperCase';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const History = () => {
    const  userContext = useContext(UserContext);
    const { loadUser } = userContext;

    const [blockList, setBlockList] = useState([]);
    const [visitList, setVisitList] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);
    const [showUnblock, setShowUnblock] = useState(false);

    const classes = useStyles();
    const history = useHistory();
    const blocks = [];
    const visits = [];
    const likes = [];

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

    const getVisitList = async () => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get('/user/visitlist');
            setVisitList(result.data.data);
            setLoading(false);
        }catch(err){
            console.log(err);
        }
    }

    const getLikeList = async () => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get('/user/likelist');
            setLikeList(result.data.data);
            setLoading(false);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        loadUser();
        getBlockList();
        getVisitList();
        getLikeList();
        if(success) {
            toast.success(success);
        }
        //eslint-disable-next-line
      }, [success]);
    
    if (loading) return <Spinner />;
    
    const showUnblockComfirm = () => {
        setShowUnblock(true);
    }
  
    const visitProfile = (id_user) => {
        history.push(`/profile/${id_user}`);
    }

    if(blockList.length){
        blockList.map((blockUser, key) => {
            let primary = `${toUpperCase(blockUser.firstname)} ${toUpperCase(blockUser.lastname)}`;
            blocks.push(
                <ListItem key={key} color="primary">
                    <ListItemAvatar>
                        <ImageAvatars userid={blockUser.id_user}/>
                    </ListItemAvatar>
                        <ListItemText primary={primary} />
                    <button className="btn-sm btn-primary"
                        onClick={showUnblockComfirm}
                    >
                        Unblock User
                    </button>
                    {showUnblock ? 
                        <UnblockComfirm 
                            show={showUnblock} 
                            handleClose={()=>setShowUnblock(false)} 
                            blockUserId={blockUser.id_user} 
                            blockUserFirstname = {toUpperCase(blockUser.firstname)}
                            blockUserLastname = {toUpperCase(blockUser.lastname)}
                            success={(data)=>setSuccess(data)}
                        /> : null}
                </ListItem>
            );
        });
    }

    if(visitList.length){
        visitList.map((visitUser, key) => {
            let primary = `You ${visitUser.notification} ${toUpperCase(visitUser.firstname)} ${toUpperCase(visitUser.lastname)}`;
            let secondary = `on ${visitUser.notif_time}`
            visits.push(
                <ListItem key={key} color="primary">
                    <ListItemAvatar>
                        <ImageAvatars userid={visitUser.id_user}/>
                    </ListItemAvatar>
                        <ListItemText 
                            primary={primary}
                            secondary={secondary} />
                    <button className="btn-sm btn-primary"
                        onClick={()=>{visitProfile(visitUser.id_user)}}>
                        visit Profile
                    </button>
                </ListItem>
            );
        });
    }

    if(likeList.length){
        likeList.map((likeUser, key) => {
            let primary = `You ${likeUser.notification} ${toUpperCase(likeUser.firstname)} ${toUpperCase(likeUser.lastname)}`;
            let secondary = `on ${likeUser.notif_time}`
            likes.push(
                <ListItem key={key} color="primary">
                    <ListItemAvatar>
                        <ImageAvatars userid={likeUser.id_user}/>
                    </ListItemAvatar>
                        <ListItemText 
                            primary={primary}
                            secondary={secondary} />
                    <button className="btn-sm btn-primary"
                        onClick={()=>{visitProfile(likeUser.id_user)}}>
                        visit Profile
                    </button>
                </ListItem>
            );
        });
    }

    return (
        <div className={classes.root}>
            <p className="large">History</p>
            <div>
                <Chip label="Visits" color="primary"/>
                <Divider />
                <List>
                    {visitList.length ? 
                        visits : 
                        <p className="text-center">You did not visit any user before.</p>}
                </List>
            </div>
            <div>
                <Chip width="500" label="Likes" color="primary"/>
                <Divider />
                <List>
                    {likeList.length ? 
                        likes : 
                        <p className="text-center">You did not like any user before.</p>}
                </List>
            </div>
            <div>
                <Chip width="500" label="Blocks" color="primary"/>
                <Divider />
                <List>
                    {blockList.length ? 
                        blocks : 
                        <p className="text-center">You did not block any user.</p>}
                </List>
            </div>
        </div>
    )
}
export default History;