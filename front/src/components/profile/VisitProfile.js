import React, { Fragment, useContext, useEffect, useState } from 'react'
import ProfileContext from '../../contexts/profile/profileContext';
import ChatContext from '../../contexts/chat/chatContext';
import Interests from './Interests';
import Pictures from './Pictures';
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
import Spinner from '../layout/Spinner';

const useStyles = makeStyles(theme => ({
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

const VisitProfile = ({ userid })=> {
    const  profileContext = useContext(ProfileContext);
    const  chatContext = useContext(ChatContext);
    const classes = useStyles();

    const { 
        profile, emptyProfile, like, error, success, loading, connected,
        checkLike, unLike, addLike, 
        clearSuccess, clearError,
    } = profileContext;
    const { getFriendsList } = chatContext;

    const [showUnlike, setShowUnlike] = useState(false);
    const [showBlock, setShowBlock] = useState(false);
    const [showFake, setShowFake] = useState(false);
    const [showChatroom, setShowChatroom] = useState(false);
    const [activeChatroom, setActiveChatroom] = useState(null);

    const getChatroom = async() => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get(`/chat/getchatroom/${userid}`);
            if(typeof(result.data.data)!=='undefined'){
                setActiveChatroom(result.data.data.id_chatroom);
            }
        }catch(err){
            console.log(err);
        }
    }
    
    useEffect(() => {
        checkLike(userid);
        getChatroom();
        getFriendsList();
        if(error) {
            toast.error(error);
            clearError();
        }
        if(success) {
            toast.success(success);
            clearSuccess();
        }
        // eslint-disable-next-line
    }, [error, success]);

    const likeClick = () => {
        addLike(userid);
    }

    const unLikeClick = () => {
        if(!connected){
            unLike(userid);
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
                            : null
                        }
                        {((profile && profile.data.avatar) || (profile && profile.data.pictures.length)) ? 
                            like ? 
                                <MyTooltip title="Unlike">
                                    <FavoriteIcon color="primary" onClick={unLikeClick}/>
                                </MyTooltip>
                                : 
                                <MyTooltip title="Like">
                                    <FavoriteBorderIcon color="primary" onClick={likeClick}/>
                                </MyTooltip>
                        : null} 
                    </div>
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
                <Typography variant="subtitle2" component="span">{profile.data.city}</Typography>
                <br></br>
                <Typography variant="subtitle2" component="span" color="primary">Orientation:  </Typography>
                <Typography variant="subtitle2" component="span">{profile && toUpperCase(profile.data.sex_prefer)}</Typography>
                <Divider variant="middle" style={{margin:"5px 0"}}/>
                <div>
                    <Typography variant="subtitle2" component="p" color="primary">Biography:</Typography>
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
    
    if (loading) return <Spinner />;

    const NoProfile = (
        <Fragment>
            <div className="text-center">
                {emptyProfile}
            </div>
        </Fragment>
    )

    return (
        <Fragment>
           { (!emptyProfile) ? RenderProfile: NoProfile }
        </Fragment>
    )
}

export default VisitProfile
