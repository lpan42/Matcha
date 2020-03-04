import React, { Fragment, useContext, useEffect, useState } from 'react'
import AlertContext from '../../contexts/alert/alertContext';
import UserContext from '../../contexts/user/userContext';
import ProfileContext from '../../contexts/profile/profileContext';
import EditInterests from './EditInterests';

const EditProfile = () => {
    const  profileContext = useContext(ProfileContext);
    const  alertContext = useContext(AlertContext);
    const  userContext = useContext(UserContext);

    const { interests_list, profile, emptyProfile, error, success, clearMessage } = profileContext;
    const { setAlert } = alertContext;
    const { user} = userContext;

    const [update,setUpdate] = useState({
        gender: profile ? profile.data.gender : null,
        sex_prefer: profile ? profile.data.sex_prefer : null,
        birthday: profile ? profile.data.birthday : null,
        biography: profile ? profile.data.biography : null,
    }
    );
       
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
        console.log(update);
  
    }

    const updateField = e => {
        setUpdate({
          ...update,
          [e.target.name]: e.target.value
        });
      };

    return (
        <Fragment>
            <p>Firstname:</p> <p>{user && user.data.firstname}</p> 
            <p>Lastname:</p> <p>{user && user.data.lastname}</p>
            <form onSubmit={OnSubmit}>
                <div className="form-group">
                    <label htmlFor="gender">Gender: </label>
                    <input type="button" name="gender" value="male" 
                        className={update.gender == 'male' ? "btn-primary btn-sm" : "btn-light btn-sm"}
                        onClick={updateField}/> 
                    <input type="button" name="gender" value="female" 
                        className={update.gender == 'female' ? "btn-primary btn-sm" : "btn-light btn-sm"}
                        onClick={updateField}/>
                </div>
                <div>
                <label htmlFor="sex_prefer">Sex Orientation: </label>
                    <input type="button" name="sex_prefer" value="hetero" 
                        className={update.sex_prefer == 'hetero' ? "btn-primary btn-sm" : "btn-light btn-sm"}
                        onClick={updateField}/> 
                        <input type="button" name="sex_prefer" value="homo" 
                        className={update.sex_prefer == 'homo' ? "btn-primary btn-sm" : "btn-light btn-sm"}
                        onClick={updateField}/>
                    <input type="button" name="sex_prefer" value="bio" 
                        className={update.sex_prefer == 'bio' ? "btn-primary btn-sm" : "btn-light btn-sm"}
                        onClick={updateField}/>
                </div>
                <div className="form-group">
                    <label htmlFor="birthday">Birthday: </label>
                    <input type='date' name='birthday' value={update.birthday} onChange={updateField} />
                </div>
                <div className="form-group">
                    <label htmlFor="biography">Biography: </label>
                    <textarea rows="4" cols="50" name='biography' value={update.biography} onChange={updateField} />
                </div>
                <div  className="form-group">
                <label htmlFor="Interests">Interests: </label>
                <EditInterests interests_list={interests_list && interests_list.data} />
                </div>
                <input type="submit" value="Comfirm" className="btn btn-primary btn-block" />
            </form>
        </Fragment>
    )
}

export default EditProfile
