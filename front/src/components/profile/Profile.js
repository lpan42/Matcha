import React, { Fragment, useContext, useEffect} from 'react'
import AlertContext from '../../contexts/alert/alertContext';
import UserContext from '../../contexts/user/userContext';
import ProfileContext from '../../contexts/profile/profileContext';
import Interests from './Interests';
import EditProfile from './EditProfile'

const Profile = ({ match }) => {
    const  profileContext = useContext(ProfileContext);
    const  alertContext = useContext(AlertContext);
    const  userContext = useContext(UserContext);

    const { getProfile, profile, emptyProfile, error, success, clearMessage } = profileContext;
    const { setAlert } = alertContext;
    const { loadUser, user} = userContext;

    useEffect(() => {
        loadUser();
        getProfile(match.params.userid);
        if(error) {
            setAlert(error, 'danger');
            clearMessage();
        }
        if(success) {
            setAlert(success, 'success');
            clearMessage();
        }
        // eslint-disable-next-line
    }, [error, success]);

    const OnClick =()=>{
       
    }
    const RenderProfile = (
        <Fragment>
            <p>{profile && profile.data.online ? "online" : ("Offline, since: " + (profile && profile.data.last_login))}</p>
            <p>Fame: {profile && profile.data.fame}</p>
            <p>Fristname: {profile && profile.data.firstname}</p>
            <p>Lastname: {profile && profile.data.lastname}</p>
            <p>Birthday: {profile && profile.data.birthday}</p>
            <p>Biography: {profile && profile.data.biography}</p>
            <p>Interest: <Interests interests ={profile && profile.data.interests} /></p>
        </Fragment>
    )
    
    const NoProfile = (
        <Fragment>
            <p className="text-center">{emptyProfile}</p>
            {match.params.userid == (user && user.data.id) ? <button className="btn-primary btn-block" onClick={OnClick}>Create my Profile</button> : null}
        </Fragment>
    )

    return (
        <div>
           { !emptyProfile ? RenderProfile: NoProfile }
        </div>
    )
}

export default Profile
