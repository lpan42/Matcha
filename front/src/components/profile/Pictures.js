import React, { Fragment, useContext }from 'react'
import ProfileContext from '../../contexts/profile/profileContext';
import ImageGallery from 'react-image-gallery';

const Pictures = () => {
    const  profileContext = useContext(ProfileContext);

    const { profile } = profileContext;

    const profilePictures = profile && profile.data.pictures;
    const pictures = [];
    if(profile && profile.data.avatar){
        pictures.push(
            {
                original: `${profile && profile.data.avatar}`,
            }
        )
    }

    if(profilePictures){
        profilePictures.map((picture,key) => {
            pictures.push(
                {
                    original: `${picture.path}`,
                }
            );
        })
    }
   
    return (
        <div>
            {pictures.length ? 
            <ImageGallery items={pictures} 
                showThumbnails={false}
                showFullscreenButton={false}
                showPlayButton={false}
                showBullets={true}
            />
            :null}
            
        </div>
    )
}
export default Pictures
