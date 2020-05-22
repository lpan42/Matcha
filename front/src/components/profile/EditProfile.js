import React, { useContext, useState } from 'react'
import UserContext from '../../contexts/user/userContext';
import ProfileContext from '../../contexts/profile/profileContext';
import EditInterests from './EditInterests';
import UploadAvatars from '../modals/UploadAvatars';
import EditPictures from './EditPictures';
import EditLocation from './EditLocation';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import toUpperCase from '../../utils/toUpperCase';
import moment from 'moment';

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
        textAlign:"left",
    },
    avatarDiv:{
        display:"flex", 
        justifyContent:"flex-start",
        alignItems:"flex-end",
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

const EditProfile = () => {
    const  profileContext = useContext(ProfileContext);
    const  userContext = useContext(UserContext);
    const classes = useStyles();
    const { interests_list, profile,
        updateProfile, updateInterests, uploadPictures, modifyPictures 
    } = profileContext;
    const { user } = userContext;

    const [update,setUpdate] = useState({
        gender: profile.data.gender ? profile.data.gender : '',
        sex_prefer: profile.data.sex_prefer ? profile.data.sex_prefer : '',
        birthday: profile.data.birthday ? profile.data.birthday : '',
        biography: profile.data.biography ? profile.data.biography : '',
    }
    );
    
    const OnSubmit=(e)=>{
        e.preventDefault(); 
        let updatePics = [];
        let formData = new FormData();
        for(let x = 0; x < profile.data.pictures.length; x++) {
            if(profile.data.pictures[x].file){
                formData.append('file', profile.data.pictures[x].file);
            }
            if(profile.data.pictures[x].path){
                updatePics.push({ path: profile.data.pictures[x].path });
            }
        }
        updateProfile(update);
        updateInterests(profile.data.interests);
        uploadPictures(formData);
        modifyPictures(updatePics);
    }

    const updateField = e => {
        setUpdate({
          ...update,
          [e.target.name]: e.target.value
        });
      };
    
    const calculateMinBirthday = () => {
        const minBirthday = moment().subtract(18, 'years').calendar();
        const formatMin = moment(minBirthday).format('YYYY-MM-DD');
        return(formatMin);
    }

    return (
        <Card className={classes.card}>
            <div className={classes.context}>
                <Typography variant="h5" color="primary" style={{marginBottom:"10px"}}>Edit My Profile</Typography>
                <div className={classes.avatarDiv}>
                    <Avatar 
                        alt={profile&&profile.data.username}
                        src={profile&&profile.data.avatar} 
                        className={classes.largeAvatar}
                    />
                    <UploadAvatars  />
                </div>
                <Divider variant="middle" style={{margin:"10px 0"}}/>
                <Typography variant="subtitle2" component="span" color="primary">Username:  </Typography>
                <Typography variant="subtitle2" component="span">{toUpperCase(user && user.data.username)}</Typography>
                <br></br>
                <Typography variant="subtitle2" component="span" color="primary">Name:  </Typography>
                <Typography variant="subtitle2" component="span">{toUpperCase(user && user.data.firstname)} {toUpperCase(user && user.data.lastname)}</Typography>
                <Divider variant="middle" style={{margin:"10px 0"}}/>
                <form onSubmit={OnSubmit}>
                    <div className="form-group">
                        <Typography variant="subtitle2" component="span" color="primary">Gender:  </Typography>
                        <input type="button" name="gender" value="female" 
                            className={update.gender === 'female' ? "btn-primary btn-sm" : "btn-light btn-sm"}
                            onClick={updateField}
                        />
                         <input type="button" name="gender" value="male" 
                            className={update.gender === 'male' ? "btn-primary btn-sm" : "btn-light btn-sm"}
                            onClick={updateField}
                        />
                        <br/>
                        <Typography variant="subtitle2" component="span" color="primary">Orientation:  </Typography>
                        <input type="button" name="sex_prefer" value="straight" 
                            className={update.sex_prefer === 'straight' ? "btn-primary btn-sm" : "btn-light btn-sm"}
                            onClick={updateField}/> 
                            <input type="button" name="sex_prefer" value="gay" 
                            className={update.sex_prefer === 'gay' ? "btn-primary btn-sm" : "btn-light btn-sm"}
                            onClick={updateField}/>
                        <input type="button" name="sex_prefer" value="bi" 
                            className={update.sex_prefer === 'bi' ? "btn-primary btn-sm" : "btn-light btn-sm"}
                            onClick={updateField}/>
                        <br/>
                        <Typography variant="subtitle2" component="span" color="primary">Birthday:  </Typography>
                        <Typography variant="caption" component="span" color="primary">(You need to be as least 18 years old)</Typography>
                        <br/>
                        <input type='date' name='birthday' value={update.birthday} onChange={updateField} 
                            max={calculateMinBirthday()}
                            style={{width:"150px", height:"40px",border:"1px solid #60A561"}}
                        />
                        <br/>
                        <Divider variant="middle" style={{margin:"10px 0"}}/>
                        <Typography variant="subtitle2" component="span" color="primary">Biography:  </Typography><br/>
                        <textarea rows="4" cols="50" name='biography' value={update.biography} onChange={updateField}
                            style={{border:"1px solid #60A561"}}
                        />
                        <br/>
                        <Divider variant="middle" style={{margin:"10px 0"}}/>
                        <Typography variant="subtitle2" component="span" color="primary">Interests:  </Typography><br/>
                        <EditInterests interests_list={interests_list && interests_list.data} />
                        <br/>
                        <EditLocation/>
                        <br/>
                        <Divider variant="middle" style={{margin:"10px 0"}}/>
                        <Typography variant="subtitle2" component="span" color="primary">Pictures:  </Typography>
                        <EditPictures />
                        <br/>
                        <Button type="submit" color="primary" variant="contained">Confirm</Button>
                    </div>
                </form>
            </div>
        </Card>
    )
}

export default EditProfile
