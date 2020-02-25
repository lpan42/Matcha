import React, {Fragment} from 'react'

const Interests = ({ interests }) => {
    const interest =[];
    for(const key in interests){
        interest.push(<li>{interests[key].interest}</li>);
    }
    return (
        <Fragment>{interest}</Fragment>
    )
}

export default Interests
