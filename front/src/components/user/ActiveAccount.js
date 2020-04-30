import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

const ActiveAccount = ({ match }) => {
    const active_link = match.params.active_link;
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const history = useHistory();

    const verfiyLink = async () => {
        try{
            const result =  await axios.post(`/user/active/${active_link}`);
            setSuccess(result.data.success);
        }catch(err){
            setError(err.response.data.error);
            
        }
    }

    useEffect(() => {
        verfiyLink();
        if(error) {
            toast.error(error);
            history.push(`/`);
        }
        if(success) {
            toast.success(success);
            history.push(`/`);
        }
        //eslint-disable-next-line
      }, [error, success]);

    return (
        <div></div>
    )
}

export default ActiveAccount;