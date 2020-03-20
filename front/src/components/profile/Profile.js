import React, { Fragment, useContext, useEffect, useState } from 'react'
import AlertContext from '../../contexts/alert/alertContext';
import UserContext from '../../contexts/user/userContext';
import ProfileContext from '../../contexts/profile/profileContext';
import Interests from './Interests';
import EditProfile from './EditProfile';
import Spinner from '../layout/Spinner';
import ImageAvatars from '../badge/ImageAvatars';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';


const Profile = ({ match }) => {
    const  profileContext = useContext(ProfileContext);
    const  alertContext = useContext(AlertContext);
    const  userContext = useContext(UserContext);

    const { 
        profile, emptyProfile, like, error, success, loading,
        getProfile, checkLike, getInterestsList, clearMessage, unLike, addLike,
    } = profileContext;
    const { setAlert } = alertContext;
    const { loadUser, user} = userContext;

    const [edit, setEdit] = useState(false);
  
    useEffect(() => {
        loadUser();
        getInterestsList();
        getProfile(match.params.userid);
        checkLike(match.params.userid);
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

    if (loading) return <Spinner />;

    const OnClick = () => {
        setEdit(true);
    }
    const likeClick = () =>{
        if(like) unLike(match.params.userid);
        else addLike(match.params.userid);
    }

    const RenderProfile = (
        <div>
            {+match.params.userid === (user && user.data.id) ? 
                null :
                (like ? 
                    <div><FavoriteIcon color="primary" onClick={likeClick}/></div> :
                    <div><FavoriteBorderIcon color="primary" onClick={likeClick}/></div>
                )
            }
            <div>
                {+match.params.userid === (user && user.data.id) ? <button className="btn-primary" onClick={OnClick}>Edit my Profile</button> : null}
                <ImageAvatars />
                <p>{profile && profile.data.online ? "online" : ("Offline, since: " + (profile && profile.data.last_login))}</p>
                <p>Fame: {profile && profile.data.fame}</p>
                <p>Fristname: {profile && profile.data.firstname}</p>
                <p>Lastname: {profile && profile.data.lastname}</p>
                <p>Gender: {profile && profile.data.gender}</p>
                <p>Sex Orientation: {profile && profile.data.sex_prefer}</p>
                <p>Birthday: {profile && profile.data.birthday}</p>
                <p>Biography: {profile && profile.data.biography}</p>
                <p>Interests: <Interests interests ={profile && profile.data.interests} /></p>
            </div>
        </div>
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
