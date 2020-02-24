import React, { Fragment, useContext, useEffect} from 'react'
import AlertContext from '../../contexts/alert/alertContext';
import UserContext from '../../contexts/user/userContext';
import ProfileContext from '../../contexts/profile/profileContext';

const Profile = ({ match }) => {
    const  profileContext = useContext(ProfileContext);
    const  alertContext = useContext(AlertContext);
    const  userContext = useContext(UserContext);

    const { getProfile, profile, error, success, clearMessage } = profileContext;
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

    return (
        <div>
            <p>profile: {profile && profile.data.birthday}</p>
        </div>
    )
}

export default Profile
