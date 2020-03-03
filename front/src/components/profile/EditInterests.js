import React, { Fragment, useContext} from 'react'
import ProfileContext from '../../contexts/profile/profileContext';

const EditInterests = ({ interests_list }) => {
    const profileContext = useContext(ProfileContext);
    const { profile } = profileContext;
    const selectedInterests = [];
    if(profile){
        selectedInterests = profile.data.interests;
    }
    let interests = [];
    let check = false;
    const selected = "btn-primary btn-sm";
    const deselected = "btn-light btn-sm";
    interests_list.map((interest,key) => {
        if(selectedInterests){
            selectedInterests.map((selectedInterest) => {
                if (interest.id_interest == selectedInterest.id_interest){
                    interests.push(<input className={selected} type="button" key={key} value={interest.interest}/>);
                    check = true;
                }
            })
        }
        if(check)
            check = false;
        else
            interests.push(<input className={deselected} type="button" key={key} value={interest.interest}/>);
    })

    return (
        <Fragment> { interests } </Fragment>
    )
}

export default EditInterests