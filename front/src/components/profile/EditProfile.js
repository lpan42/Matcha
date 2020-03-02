import React, { Fragment, useContext, useEffect, useState } from 'react'
import AlertContext from '../../contexts/alert/alertContext';
import UserContext from '../../contexts/user/userContext';
import ProfileContext from '../../contexts/profile/profileContext';
import EditInterests from './EditInterests';

const EditProfile = () => {
    const  profileContext = useContext(ProfileContext);
    const  alertContext = useContext(AlertContext);
    const  userContext = useContext(UserContext);

    const { getProfile, interests_list, profile, emptyProfile, error, success, clearMessage } = profileContext;
    const { setAlert } = alertContext;
    const { user} = userContext;

    const [bio,setBio] = useState(profile.data.biography);

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
    // console.log("edit profile", interests_list);
    const OnSubmit=(e)=>{
        e.preventDefault();
    }
    return (
        <Fragment>
            <p>Firstname:</p> <p>{user && user.data.firstname}</p> 
            <p>Lastname:</p> <p>{user && user.data.lastname}</p>
            <form onSubmit={OnSubmit}>
                <div className="form-group">
                    <label htmlFor="gender">Gender: </label>
                    <input type="radio" value="male" 
                        checked={profile && profile.data.gender==='Male'? true: false}
                        onChange={e => profile.data.gender = e.target.value}/> 
                        Male
                    <input type="radio" value="female" 
                        checked={profile && profile.data.gender==='Female' ? true : false}
                        onChange={e => profile.data.gender = e.target.value} /> 
                        Female
                </div>
                <div className="form-group">
                    <label htmlFor="birthday">Birthday: </label>
                    <input type='date' name='birthday'
                    placeholder={profile && profile.data.birthday}
                    onChange={e => profile.data.birthday = e.target.value.toLowerCase()} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Biography: </label>
                    <input type='text' name='biography'
                        value={bio} 
                        onChange={e => profile.data.biography = setBio(e.target.value)} />
                </div>
                <div>
                <EditInterests interests_list={interests_list && interests_list.data} />
                </div>
                <input type="submit" value="Comfirm" className="btn btn-primary btn-block" />
            </form>
        </Fragment>
    )
}

export default EditProfile
