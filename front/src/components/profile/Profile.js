import React, { Fragment, useContext, useEffect, useState } from 'react'
import AlertContext from '../../contexts/alert/alertContext';
import UserContext from '../../contexts/user/userContext';
import ProfileContext from '../../contexts/profile/profileContext';
import Interests from './Interests';
import EditProfile from './EditProfile';

const Profile = ({ match }) => {
    const  profileContext = useContext(ProfileContext);
    const  alertContext = useContext(AlertContext);
    const  userContext = useContext(UserContext);

    const { getProfile, getInterestsList,profile, emptyProfile, error, success, clearMessage } = profileContext;
    const { setAlert } = alertContext;
    const { loadUser, user} = userContext;
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        loadUser();
        getInterestsList();
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

    const OnClick = () => {
        setEdit(true);
    }
    const RenderProfile = (
        <Fragment>
            {+match.params.userid === (user && user.data.id) ? <button className="btn-primary btn-block" onClick={OnClick}>Edit my Profile</button> : null}
            <p>{profile && profile.data.online ? "online" : ("Offline, since: " + (profile && profile.data.last_login))}</p>
            <p>Fame: {profile && profile.data.fame}</p>
            <p>Fristname: {profile && profile.data.firstname}</p>
            <p>Lastname: {profile && profile.data.lastname}</p>
            <p>Gender: {profile && profile.data.gender}</p>
            <p>Sex Orientation: {profile && profile.data.sex_prefer}</p>
            <p>Birthday: {profile && profile.data.birthday}</p>
            <p>Biography: {profile && profile.data.biography}</p>
            <p>Interests: <Interests interests ={profile && profile.data.interests} /></p>
        </Fragment>
    )
    
    const NoProfile = (
        <Fragment>
            <div className="text-center">{emptyProfile}
            {(+match.params.userid === (user && user.data.id) && !edit) ? <button className="btn-primary btn-block" onClick={OnClick}>Create my Profile</button> : null}
            </div>
        </Fragment>
    )

    return (
        <div>
           { (!emptyProfile && !edit) ? RenderProfile: NoProfile }
           { edit && <EditProfile /> }
        </div>
    )
}

export default Profile
