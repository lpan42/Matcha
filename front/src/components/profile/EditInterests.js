import React, { Fragment, useContext, Children } from 'react'
import ProfileContext from '../../contexts/profile/profileContext';

const EditInterests = ({ interests_list }) => {
    const  profileContext = useContext(ProfileContext);
    const { profile } = profileContext;
    const selectedInterests = profile.data.interests;
    const interest = [];
    const selected = "btn-primary btn-sm";
    const deselected = "btn-light btn-sm";
    console.log('interests_list is ', interests_list);
    console.log('selected', selectedInterests);
    // for(let key in interests_list){
    //     console.log(selectedInterests[0].id_interest);
    //     interest.push(<input className={deselected} type="button" key={key} value={interests_list[key].interest}/>);
    // }
    interests_list.map((interest, index) => {
        if (interest === selectedInterests[index])
            console.log('interest', interest.id_interest);
        else{
            console.log(interest.id_interest);
        }
    })

    return (
        <Fragment>{interest}</Fragment>
    )
}

export default EditInterests
