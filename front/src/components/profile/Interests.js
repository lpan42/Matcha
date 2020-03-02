import React, { Fragment } from 'react'

const Interests = ({ interests }) => {
    const interest =[];
    for(const key in interests){
        interest.push(<button className="btn-primary btn-sm" key={key}>{interests[key].interest}</button>);
    }
    return (
        <Fragment>{interest}</Fragment>
    )
}

export default Interests
