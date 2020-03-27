import React, { Fragment, useContext, useEffect, useState } from 'react'
import AlertContext from '../../contexts/alert/alertContext';
import UserContext from '../../contexts/user/userContext';
import ProfileContext from '../../contexts/profile/profileContext';
import EditInterests from './EditInterests';
import UploadAvatars from '../modals/UploadAvatars';
import ImageAvatars from '../badges/ImageAvatars';
import EditPictures from './EditPictures';

const EditProfile = () => {
    const  profileContext = useContext(ProfileContext);
    const  alertContext = useContext(AlertContext);
    const  userContext = useContext(UserContext);

    const { interests_list, profile, error, success, clearMessage, updateProfile, updateInterests } = profileContext;
    const { setAlert } = alertContext;
    const { user} = userContext;

    const [update,setUpdate] = useState({
        gender: profile.data.gender ? profile.data.gender : '',
        sex_prefer: profile.data.sex_prefer ? profile.data.sex_prefer : '',
        birthday: profile.data.birthday ? profile.data.birthday : '',
        biography: profile.data.biography ? profile.data.biography : '',
    }
    );
    const oldProfilePics = profile.data.pictures;
    useEffect(() => {
        
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

    const OnSubmit=(e)=>{
        e.preventDefault();
        // updateProfile(update);
        // updateInterests(profile.data.interests);
        console.log(oldProfilePics)
        console.log(profile.data.pictures)
        if (JSON.stringify(oldProfilePics) !== JSON.stringify(profile.data.pictures))
        {
            console.log("Changed!");
        }
    }

    const updateField = e => {
        setUpdate({
          ...update,
          [e.target.name]: e.target.value
        });
      };
    
    return (
        <Fragment>
            <ImageAvatars avatarPath={profile && profile.data.avatar}/> <UploadAvatars />
            <p>Username: {user && user.data.username}</p>
            <p>Firstname: {user && user.data.firstname}</p> 
            <p>Lastname: {user && user.data.lastname}</p>
            <form onSubmit={OnSubmit}>
                <div className="form-group">
                    <label htmlFor="gender">Gender: </label>
                    <input type="button" name="gender" value="male" 
                        className={update.gender === 'male' ? "btn-primary btn-sm" : "btn-light btn-sm"}
                        onClick={updateField}/> 
                    <input type="button" name="gender" value="female" 
                        className={update.gender === 'female' ? "btn-primary btn-sm" : "btn-light btn-sm"}
                        onClick={updateField}/>
                    <br/>
                    <label htmlFor="sex_prefer">Sex Orientation: </label>
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
                    <label htmlFor="birthday">Birthday: </label>
                    <input type='date' name='birthday' value={update.birthday} onChange={updateField} />
                    <br/>
                    <label htmlFor="Pictures">Pictures: </label><br/>
                    <EditPictures />
                    <br/>
                    <label htmlFor="biography">Biography: </label>
                    <textarea rows="4" cols="50" name='biography' value={update.biography} onChange={updateField} />
                    <br/>
                    <label htmlFor="Interests">Interests: </label>
                    <EditInterests interests_list={interests_list && interests_list.data} />
                    <br/>
                    <input type="submit" value="Comfirm" className="btn btn-primary btn-block" />
                </div>
            </form>
        </Fragment>
    )
}

export default EditProfile
