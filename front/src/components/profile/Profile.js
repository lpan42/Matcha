import React, { Fragment, useContext, useEffect, useState } from 'react'
import UserContext from '../../contexts/user/userContext';
import ProfileContext from '../../contexts/profile/profileContext';
import ChatContext from '../../contexts/chat/chatContext';
import Interests from './Interests';
import EditProfile from './EditProfile';
import Pictures from './Pictures';
import Spinner from '../layout/Spinner';
import DiscounnectComfirm from '../modals/DisconnectComfirm';
import BlockComfirm from '../modals/BlockComfirm';
import toUpperCase from '../../utils/toUpperCase';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BlockIcon from '@material-ui/icons/Block';
import { toast } from 'react-toastify';
import SmsIcon from '@material-ui/icons/Sms';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import ChatRoomModal from '../chats/ChatRoomModal';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import calculateAge from '../../utils/calculateAge';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CakeIcon from '@material-ui/icons/Cake';
import WcIcon from '@material-ui/icons/Wc';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(theme => ({
    container: {
        height: "90vh",
        margin: "0",
        padding: "1rem 2rem",
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
        overflow: "auto",
        maxHeight:1000,
        minWidth: 300,
        maxWidth:600,
    },
    context: {
        padding:"15px",
    },
    largeAvatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
      },
  }));

const MyTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
      boxShadow: theme.shadows[1],
      fontSize: 10,
    }, 
  }))(Tooltip);

const Profile = ({ match }) => {
    const  profileContext = useContext(ProfileContext);
    const  userContext = useContext(UserContext);
    const  chatContext = useContext(ChatContext);
    const classes = useStyles();

    const { 
        profile, emptyProfile, like, error, success, loading, connected,
        getProfile, checkLike, getInterestsList, unLike, addLike, 
        clearSuccess, clearError,
    } = profileContext;
    const { loadUser, user} = userContext;
    const { getFriendsList } = chatContext;

    const [edit, setEdit] = useState(false);
    const [showUnlike, setShowUnlike] = useState(false);
    const [showBlock, setShowBlock] = useState(false);
    const [showChatroom, setShowChatroom] = useState(false);
    const [activeChatroom, setActiveChatroom] = useState(null);

    const getChatroom = async() => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get(`/chat/getchatroom/${match.params.userid}`);
            if(result.data.data.id_chatroom){
                setActiveChatroom(result.data.data.id_chatroom);
            }
        }catch(err){
            console.log(err);
        }
    }
    
    useEffect(() => {
        loadUser();
        getInterestsList();
        getProfile(match.params.userid);
        checkLike(match.params.userid);
        getChatroom();
        getFriendsList();
        if(error) {
            toast.error(error);
            clearError();
        }
        if(emptyProfile){
            toast.warning(emptyProfile);
        }
        if(success) {
            toast.success(success);
            clearSuccess();
        }
        // eslint-disable-next-line
    }, [error, emptyProfile, success]);

    if (loading) return <Spinner />;
    
    const editProfile = () => {
        setEdit(true);
    }
    const likeClick = () => {
        addLike(match.params.userid);
    }

    const unLikeClick = () => {
        if(!connected){
            unLike(match.params.userid);
        }
        else{
            setShowUnlike(true);
        }
    }
    
    const blockUser = () => {
        setShowBlock(true);
    }

    const openChatroom =() =>{
        setShowChatroom(true);
    }
    const RenderProfile = (
        <Card className={classes.card}>
            <div className={classes.context}>
                <Typography variant="h4" color="primary">Profile</Typography>
                <div style={{display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
                    {+match.params.userid === (user && user.data.id) ? 
                        <div >
                            <MyTooltip title="Edit My Profile">
                                <EditIcon color="primary" onClick={editProfile}/>
                            </MyTooltip>
                        </div>: 
                        <div>
                            <MyTooltip title="Block User">
                                <BlockIcon color="error" onClick={blockUser}/>
                            </MyTooltip>
                            {connected ? 
                                <MyTooltip title="Send A Message">
                                    <SmsIcon color="primary"  onClick={openChatroom}/>
                                </MyTooltip>
                                : null}
                            {like ? 
                                <MyTooltip title="Unlike">
                                    <FavoriteIcon color="primary" onClick={unLikeClick}/>
                                </MyTooltip>
                                : 
                                <MyTooltip title="Like">
                                    <FavoriteBorderIcon color="primary" onClick={likeClick}/>
                                </MyTooltip>
                            }
                        </div>
                    }
                    {showBlock ? <BlockComfirm show={showBlock} handleClose={()=>setShowBlock(false)}/> : null}
                    {showUnlike ? <DiscounnectComfirm show={showUnlike} handleClose={()=>setShowUnlike(false)}/> : null} 
                    {showChatroom ? <ChatRoomModal 
                        show={showChatroom} 
                        handleClose={()=>setShowChatroom(false)} 
                        activeChatroom={activeChatroom}
                    /> : null}   
                </div>
                <div style={{display:"flex", alignItems:"flex-end", justifyContent:"flex-between"}}>
                    <Avatar 
                        alt={profile&&profile.data.username}
                        src={profile&&profile.data.avatar} 
                        className={classes.largeAvatar}
                    />
                    <div style={{paddingLeft:"15px",textAlign:"left"}}>
                        {profile && profile.data.online ?   
                            <p style={{color:"var(--success-color)"}}>Online</p> : <p style={{color:"var(--danger-color)"}}>Last login: {profile && profile.data.last_login}</p>}
                        <Typography variant="caption" component="p"><i className="fas fa-star" style={{color:"var(--primary-color)"}}></i>{profile && profile.data.fame}</Typography>
                        <p>Username: {profile && toUpperCase(profile.data.username)}</p>
                        <p>Fristname: {profile && toUpperCase(profile.data.firstname)}</p>
                        <p>Lastname: {profile && toUpperCase(profile.data.lastname)}</p>
                    </div>
                </div>
                <p>Gender: {(profile && profile.data.gender) ? toUpperCase(profile.data.gender) : NaN}</p>
                <p>Sex Orientation: {profile && toUpperCase(profile.data.sex_prefer)}</p>
                <p>Age: { (profile && profile.data.birthday) ? calculateAge(profile && profile.data.birthday) : NaN }</p>
                <p>Biography: {profile && profile.data.biography}</p>
                <p>Interests: <Interests interests ={profile && profile.data.interests} /></p>
                <div>pictures: 
                        <Pictures />
                </div>
            </div>
        </Card>
    )
    
    const NoProfile = (
        <Fragment>
            <div className="text-center">
                {emptyProfile}
            </div>
        </Fragment>
    )

    return (
        <div className={classes.container}>
           { (!emptyProfile && !edit) ? RenderProfile: NoProfile }
           { edit && <EditProfile /> }
        </div>
    )
}

export default Profile
