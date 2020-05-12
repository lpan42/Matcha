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
import ReportFake from '../modals/ReportFake';
import toUpperCase from '../../utils/toUpperCase';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BlockIcon from '@material-ui/icons/Block';
import { toast } from 'react-toastify';
import SmsIcon from '@material-ui/icons/Sms';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import AssignmentLateOutlinedIcon from '@material-ui/icons/AssignmentLateOutlined';
import { withStyles } from '@material-ui/core/styles';
import ChatRoomModal from '../chats/ChatRoomModal';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import calculateAge from '../../utils/calculateAge';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

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
        textAlign:"left",
        overflow: "auto",
        maxHeight:1000,
        minWidth: 300,
        maxWidth: 600,
    },
    context: {
        padding:"15px",
    },
    largeAvatar: {
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(10),
            height: theme.spacing(10),
          },
        [theme.breakpoints.up('md')]: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        [theme.breakpoints.up('lg')]: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },
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
    const [showFake, setShowFake] = useState(false);
    const [showChatroom, setShowChatroom] = useState(false);
    const [activeChatroom, setActiveChatroom] = useState(null);

    const getChatroom = async() => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get(`/chat/getchatroom/${match.params.userid}`);
            if(typeof(result.data.data)!=='undefined'){
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
            setTimeout(()=>{
                window.location.reload(1);
            }, 2000);
        }
        // if(emptyProfile){
        //     toast.warning(emptyProfile);
        // }
        if(success) {
            toast.success(success);
            clearSuccess();
            setTimeout(()=>{
                window.location.reload(1);
            }, 2000);
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

    const reportFake = () => {
        setShowFake(true);
    }

    const openChatroom =() =>{
        setShowChatroom(true);
    }
    const RenderProfile = (
        <Card className={classes.card}>
            <div className={classes.context}>
                <div style={{
                    display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"10px"
                }}>
                    <Typography variant="h5" color="primary">Profile</Typography>
                    {+match.params.userid === (user && user.data.id) ? 
                        <div >
                            <MyTooltip title="Edit My Profile">
                                <EditIcon color="primary" onClick={editProfile}/>
                            </MyTooltip>
                        </div>: 
                        <div>
                             <MyTooltip title="Report Fake Account">
                                <AssignmentLateOutlinedIcon color="error" onClick={reportFake}/>
                            </MyTooltip>
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
                    {showFake ? <ReportFake 
                        show={showFake} 
                        handleClose={()=>setShowFake(false)}
                    /> : null}
                    {showBlock ? <BlockComfirm 
                        show={showBlock} 
                        handleClose={()=>setShowBlock(false)}
                    /> : null}
                    {showUnlike ? <DiscounnectComfirm 
                        show={showUnlike} 
                        handleClose={()=>setShowUnlike(false)}
                    /> : null} 
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
                        <Typography variant="h6" component="span" className={classes.text}>{profile && toUpperCase(profile.data.username)}</Typography>
                        {profile && profile.data.online ?  
                            <Typography variant="subtitle2" color="primary">Online</Typography> :
                            <Typography variant="subtitle2" color="error">Last login: {profile && profile.data.last_login}</Typography> 
                        }
                        <Typography variant="body2" component="p"><i className="fas fa-star" style={{color:"var(--primary-color)", paddingRight:"5px"}}></i>{profile && profile.data.fame}</Typography>
                    </div>
                </div>
                <Divider variant="middle" style={{margin:"10px 0"}}/>
                <Typography variant="subtitle2" component="span" color="primary">Name:  </Typography>
                <Typography variant="subtitle2" component="span">{profile && toUpperCase(profile.data.firstname)} {profile && toUpperCase(profile.data.lastname)}</Typography>
                <br></br>
                <Typography variant="subtitle2" component="span" color="primary">Gender:  </Typography>
                <Typography variant="subtitle2" component="span">{(profile && profile.data.gender) ? toUpperCase(profile.data.gender) : "NaN"}</Typography>
                <br></br>
                <Typography variant="subtitle2" component="span" color="primary">Age: </Typography>
                <Typography variant="subtitle2" component="span">{ (profile && profile.data.birthday) ? calculateAge(profile && profile.data.birthday) : "NaN" }</Typography>
                <br></br>
                <Typography variant="subtitle2" component="span" color="primary">Location: </Typography>
                <Typography variant="subtitle2" component="span">(Paris)</Typography>
                <br></br>
                <Typography variant="subtitle2" component="span" color="primary">Orientation:  </Typography>
                <Typography variant="subtitle2" component="span">{profile && toUpperCase(profile.data.sex_prefer)}</Typography>
                <Divider variant="middle" style={{margin:"5px 0"}}/>
                <div>
                    <Typography variant="subtitle2" component="p" color="primary"color="primary">Biography:</Typography>
                    <Typography variant="subtitle2" component="p">{profile && profile.data.biography}</Typography>
                </div>
                <Divider variant="middle" style={{margin:"5px 0"}}/>
                <div>
                    <Typography variant="subtitle2" component="p" color="primary">Interests:</Typography>
                    <Interests interests ={profile && profile.data.interests} />
                </div>
                <Divider variant="middle" style={{margin:"10px 0"}}/>
                <div style={{height: "480px", width: "100%"}}><Pictures /></div>
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
