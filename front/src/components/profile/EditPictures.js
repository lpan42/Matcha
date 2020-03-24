import React, { Fragment, useContext, useState, useEffect }from 'react'
import ProfileContext from '../../contexts/profile/profileContext';

const EditPictures = () => {
    const  profileContext = useContext(ProfileContext);

    const { profile } = profileContext;

    const [show, setShow] = useState(false);
    const [profilePictures, setProfilePictures] = useState([
        { path: profile.data.pictures[0] ? profile.data.pictures[0].path: '' },
        { path: profile.data.pictures[1] ? profile.data.pictures[0].path: '' },
        { path: profile.data.pictures[2] ? profile.data.pictures[0].path: '' },
        { path: profile.data.pictures[3] ? profile.data.pictures[0].path: '' }
    ]);

    const pictures = [];
    const OnClick = (e) => {
        console.log(e.target.id)
    }

    profilePictures.map((picture, key) => {
        if(picture.path){
            pictures.push(
                <div key={key}>
                    <img src={`../images/${picture.path}`} style={{height:"200px", width:"180px"}}></img>
                    <button id={key} onClick={(e) => OnClick(e)}>Edit</button>
                </div>
            );
        }
        else{
            pictures.push(
                <button key={key} id={key} style={{height:"200px", width:"180px"}} onClick={(e) => OnClick(e)}>+</button>
            );
        }
    })

    return (
        <Fragment>{ pictures }</Fragment>
    )
}

export default EditPictures