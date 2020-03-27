import React, { Fragment, useContext, useEffect, useState } from 'react'
import moment from 'moment';
import AlertContext from '../../contexts/alert/alertContext';
import UserContext from '../../contexts/user/userContext';
import ProfileContext from '../../contexts/profile/profileContext';
import Interests from './Interests';
import EditProfile from './EditProfile';
import Pictures from './Pictures';
import Spinner from '../layout/Spinner';
import DiscounnectComfirm from '../modals/DisconnectComfirm';

import ImageAvatars from '../badges/ImageAvatars';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';


const Profile = ({ match }) => {
    const  profileContext = useContext(ProfileContext);
    const  alertContext = useContext(AlertContext);
    const  userContext = useContext(UserContext);

    const { 
        profile, emptyProfile, like, error, success, loading, connected,
        getProfile, checkLike, getInterestsList, clearMessage, unLike, addLike,
    } = profileContext;
    const { setAlert } = alertContext;
    const { loadUser, user} = userContext;

    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    
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
    const LikeClick = () => {
        addLike(match.params.userid);
    }

    const UnLikeClick = () => {
        if(!connected){
            unLike(match.params.userid);
        }
        else{
            setShow(true);
        }
    }
    const calculateAge = moment().diff(profile && profile.data.birthday,'years');

    const RenderProfile = (
        <div>
            {+match.params.userid === (user && user.data.id) ? 
                null :
                (like ? 
                    <div><FavoriteIcon color="primary" onClick={UnLikeClick}/></div> :
                    <div><FavoriteBorderIcon color="primary" onClick={LikeClick}/></div>
                )
            }
            {show ? <DiscounnectComfirm show={show} handleClose={()=>setShow(false)}/> : null}
            <div>
                {+match.params.userid === (user && user.data.id) ? 
                    <button className="btn-primary" onClick={OnClick}>Edit my Profile</button> : 
                    <Fragment>
                        <button className="btn-danger" >Block this user</button>
                        {connected ? <button className="btn-primary">Send a message</button> : null}
                    </Fragment> }
                <ImageAvatars avatarPath={profile && profile.data.avatar} />
                {profile && profile.data.online ? 
                    <p style={{color:"var(--primary-color)"}}>Online</p> : 
                    <p style={{color:"var(--danger-color)"}}>Offline, Last login time: {profile && profile.data.last_login}</p>}
                <p>Fame: {profile && profile.data.fame}</p>
                <p>Username: {profile && profile.data.username}</p>
                <p>Fristname: {profile && profile.data.firstname}</p>
                <p>Lastname: {profile && profile.data.lastname}</p>
                <p>Gender: {profile && profile.data.gender}</p>
                <p>Sex Orientation: {profile && profile.data.sex_prefer}</p>
                <p>Age: { calculateAge }</p>
                {/* <p>Birthday: {profile && profile.data.birthday}</p> */}
                <p>Biography: {profile && profile.data.biography}</p>
                <div>pictures: 
                        <Pictures />
                </div>
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
