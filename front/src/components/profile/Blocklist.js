import React from 'react'
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const getBlockList = async (userid) => {
    setAuthToken(localStorage.token);
    try{
        const result =  await axios.get(`/user/profile/${userid}`);
    }catch(err){
        
    }
}

const Blocklist = () => {

    return (
        <div>
            Blocklist:
        </div>
    )
}

export default Blocklist;