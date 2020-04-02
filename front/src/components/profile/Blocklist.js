import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import UserContext from '../../contexts/user/userContext';


const Blocklist = () => {
    const  userContext = useContext(UserContext);
    const { loadUser } = userContext;

    const [blockList, setBlockList] = useState([]);

    useEffect(() => {
        loadUser();
        getBlockList();
        //eslint-disable-next-line
      }, []);
      
    const getBlockList = async () => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get('/user/blocklist');
            setBlockList(result.data.data);
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <p className="large">Blocklist</p>
            {blockList.length ? "yes" : <p>You did not block any user.</p>}
        </div>
    )
}

export default Blocklist;