import React, { Fragment, useContext, useEffect, useState } from 'react'
import ProfileContext from '../../contexts/profile/profileContext';
import Interests from './Interests';
import EditProfile from './EditProfile';
import Pictures from './Pictures';
import toUpperCase from '../../utils/toUpperCase';
import { toast } from 'react-toastify';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
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


const MyProfile = () => {
    const  profileContext = useContext(ProfileContext);
    const classes = useStyles();

    const { 
        profile, emptyProfile, error, success, clearSuccess, clearError,loading
    } = profileContext;

    const [edit, setEdit] = useState(false);
    
    useEffect(() => {
        if(error) {
            toast.error(error);
            clearError();
            setTimeout(()=>{
                window.location.reload(1);
            }, 2000);
        }
        if(success) {
            toast.success(success);
            clearSuccess();
            setTimeout(()=>{
                window.location.reload(1);
            }, 2000);
        }
        // eslint-disable-next-line
    }, [error,success]);

    const editProfile = () => {
        setEdit(true);
    }

    const RenderProfile = (
        <Card className={classes.card}>
            <div className={classes.context}>
                <div style={{
                    display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"10px"
                }}>
                    <Typography variant="h5" color="primary">Profile</Typography>
                    <div>
                        <MyTooltip title="Edit My Profile">
                            <EditIcon color="primary" onClick={editProfile}/>
                        </MyTooltip>
                    </div> 
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
                <Typography variant="subtitle2" component="span">{profile && profile.data.city }</Typography>
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
    
    const NoProfile = (
        <Fragment>
            <div className="text-center">
                {emptyProfile}
            </div>
        </Fragment>
    )   

    if (loading) return <Spinner />;

    return (
        <Fragment>
           { (!emptyProfile && !edit) ? RenderProfile: NoProfile }
           { edit && <EditProfile /> }
        </Fragment>
    )
}

export default MyProfile
