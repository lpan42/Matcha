import React, { Fragment, useContext, useState, useEffect } from 'react'
import ProfileContext from '../../contexts/profile/profileContext';

const EditInterests = ({ interests_list }) => {
    const profileContext = useContext(ProfileContext);
    const { profile } = profileContext;
    const [selectedInterests, setSelectedInterests] = useState(profile ? profile.data.interests : null);

    let interests = [];
    let check = false;
    const selected = "btn-primary btn-sm";
    const deselected = "btn-light btn-sm";

    useEffect(() => {
        profile && (profile.data.interests = selectedInterests);
    }, [selectedInterests]);

    const removeInterests = (e) => {
        setSelectedInterests(selectedInterests.filter(item => item.interest !== e.target.value));
    }
    const addInterests = (e) => {
        setSelectedInterests(selectedInterests.concat({interest: e.target.value}));//push does not work
    }
    
    interests_list.map((interest,key) => {
        if(selectedInterests){
            selectedInterests.map((selectedInterest) => {
                if (interest.interest == selectedInterest.interest){
                    interests.push(<input className={selected} type="button" onClick={removeInterests} key={key} value={interest.interest}/>);
                    check = true;
                }
            })
        }
        if(check)
            check = false;
        else
            interests.push(<input className={deselected} type="button" key={key} onClick={addInterests} value={interest.interest}/>);
    })

    return (
        <Fragment> { interests } </Fragment>
    )
}

export default EditInterests