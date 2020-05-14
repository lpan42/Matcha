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
import { toast } from 'react-toastify';
import Divider from '@material-ui/core/Divider';
import toUpperCase from '../../utils/toUpperCase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const History = () => {
    const  userContext = useContext(UserContext);
    const { loadUser, clearSuccess } = userContext;

    const [blockList, setBlockList] = useState([]);
    const [visitList, setVisitList] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);
    const [showUnblock, setShowUnblock] = useState(false);
    const [blockId,setBlockId] = useState(null);
    const [blockFirstname,setBlockFristname] = useState(null);
    const [blockLastname,setBlockLastname] = useState(null);

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
            clearSuccess();
        }
        //eslint-disable-next-line
      }, [success]);
    
    if (loading) return <Spinner />;
    
    const showUnblockComfirm = (id_user,firstname,lastname) => {
        setBlockId(id_user);
        setBlockFristname(firstname);
        setBlockLastname(lastname);
        setShowUnblock(true);
    }

    if(blockList.length){
        blockList.map((blockUser, key) => {
            let primary = `${toUpperCase(blockUser.firstname)} ${toUpperCase(blockUser.lastname)}`;
            blocks.push(
                <ListItem key={key} color="primary">
                    <ListItemAvatar>
                    <ImageAvatars 
                        username={blockUser.username}
                        avatar={blockUser.avatar} 
                        online={blockUser.online}/>  
                    </ListItemAvatar>
                        <ListItemText primary={primary} />
                    <Button size="small" color="primary" variant="contained" 
                        onClick={()=>showUnblockComfirm(blockUser.id_user, blockUser.firstname,blockUser.lastname)}
                    >
                        Unblock User
                    </Button>
                </ListItem>
            );
            return blocks;
        });
    }

    if(visitList.length){
        visitList.map((visitUser, key) => {
            let primary = `You ${visitUser.notification} ${toUpperCase(visitUser.firstname)} ${toUpperCase(visitUser.lastname)}`;
            let secondary = `on ${visitUser.notif_time}`
            visits.push(
                <ListItem key={key} color="primary">
                    <ListItemAvatar>
                    <ImageAvatars 
                        username={visitUser.username}
                        avatar={visitUser.avatar} 
                        online={visitUser.online}/>  
                    </ListItemAvatar>
                        <ListItemText 
                            primary={primary}
                            secondary={secondary} />
                    <Button size="small" color="primary" variant="contained" href={`/profile/${visitUser.id_user}`}>
                        visit Profile
                    </Button>
                </ListItem>
            );
           return visits;
        });
    }

    if(likeList.length){
        likeList.map((likeUser, key) => {
            let primary = `You ${likeUser.notification} ${toUpperCase(likeUser.firstname)} ${toUpperCase(likeUser.lastname)}`;
            let secondary = `on ${likeUser.notif_time}`
            likes.push(
                <ListItem key={key} color="primary">
                    <ListItemAvatar>
                    <ImageAvatars 
                        username={likeUser.username}
                        avatar={likeUser.avatar} 
                        online={likeUser.online}/>  
                    </ListItemAvatar>
                        <ListItemText 
                            primary={primary}
                            secondary={secondary} />
                    <Button size="small" color="primary" variant="contained" href={`/profile/${likeUser.id_user}`}>
                        visit Profile
                    </Button>
                </ListItem>
            );
            return likes;
        });
    }

    return (
        <div className="container">
            <div style={{maxWidth:"600px", margin:"auto"}}>
                <Typography variant="h5" color="primary"style={{marginBottom:"10px"}}>History</Typography>
                <div>
                    <Chip label="Visits" color="primary" style={{width:"200px"}}/>
                    <Divider />
                    <List style={{overflow: 'auto', maxHeight:"400px"}}>
                        {visitList.length ? 
                            visits : 
                            <p className="text-center">You did not visit any user before.</p>}
                    </List>
                </div>
                <div>
                    <Chip label="Likes" color="primary"  style={{width:"200px"}}/>
                    <Divider />
                    <List style={{overflow: 'auto', maxHeight:"400px"}}>
                        {likeList.length ? 
                            likes : 
                            <p className="text-center">You did not like any user before.</p>}
                    </List>
                </div>
                <div>
                    <Chip label="Blocks" color="primary"  style={{width:"200px"}}/>
                    <Divider />
                    <List style={{overflow: 'auto', maxHeight:"400px"}}>
                        {blockList.length ? 
                            blocks : 
                            <p className="text-center">You did not block any user.</p>}
                    </List>
                </div>
            </div>
            {showUnblock ? 
                <UnblockComfirm 
                    show={showUnblock} 
                    handleClose={()=>setShowUnblock(false)} 
                    blockUserId={blockId} 
                    blockUserFirstname = {toUpperCase(blockFirstname)}
                    blockUserLastname = {toUpperCase(blockLastname)}
                    success={(data)=>setSuccess(data)}
                /> : null}
        </div>
    )
}
export default History;