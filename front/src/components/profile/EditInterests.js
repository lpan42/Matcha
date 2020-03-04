import React, { Fragment, useContext, useState, Children } from 'react'
import ProfileContext from '../../contexts/profile/profileContext';
import EditProfile from './EditProfile'
const EditInterests = ({ interests_list }) => {
    const profileContext = useContext(ProfileContext);
    const { profile } = profileContext;
    let [selectedInterests, setSelectedInterests] = useState(profile ? profile.data.interests : null);

    let interests = [];
    let check = false;
    const selected = "btn-primary btn-sm";
    const deselected = "btn-light btn-sm";

    const updateInterests = (e) => {
        check = false;
        selectedInterests.map((selectedInterest) => {
            if (e.target.value == selectedInterest.interest){
                check = true;
            }
        });
        if(check)
            setSelectedInterests(selectedInterests.filter(item => item.interest !== e.target.value));
        else
            setSelectedInterests(selectedInterests.concat({interest: e.target.value}));//push does not work
        
    }

    interests_list.map((interest,key) => {
        if(selectedInterests){
            selectedInterests.map((selectedInterest) => {
                if (interest.interest == selectedInterest.interest){
                    interests.push(<input className={selected} type="button" onClick={updateInterests} key={key} value={interest.interest}/>);
                    check = true;
                }
            })
        }
        if(check)
            check = false;
        else
            interests.push(<input className={deselected} type="button" key={key} onClick={updateInterests} value={interest.interest}/>);
    })

    return (
        <Fragment> { interests } </Fragment>
    )
}

export default EditInterests