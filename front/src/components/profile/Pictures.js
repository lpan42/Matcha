import React, { Fragment, useContext }from 'react'
import ProfileContext from '../../contexts/profile/profileContext';

const Pictures = () => {
    const  profileContext = useContext(ProfileContext);

    const { profile } = profileContext;

    const profilePictures = profile && profile.data.pictures;
    const pictures = [];
    
    if(profilePictures){
        profilePictures.map((picture,key) => {
            pictures.push(
                <img key={key} src={`../images/${picture.path}`} style={{height:"200px", width:"180px"}}></img>
            );
        })
    }
   
    return (
        <div>
            {(profile && profile.data.avatar) ? 
            <img src={`../images/${profile && profile.data.avatar}`} style={{height:"200px", width:"180px"}}></img> :
            null}
            <Fragment>{ pictures }</Fragment>
        </div>
    )
}
export default Pictures
