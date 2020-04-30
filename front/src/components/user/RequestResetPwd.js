import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const RequestResetPwd = () => {
    const [value, setValue] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(error) {
            toast.error(error);
            setError(null);
        }
        if(success) {
            toast.success(success);
            setSuccess(null);
        }
        //eslint-disable-next-line
      }, [error, success]);

    const resetPwd = async () => {
        try{
            const result =  await axios.get(`/user/resetpwd/${value}`);
            setSuccess(result.data.success);
        }catch(err){
            console.log(err.response.data.error)
            setError(err.response.data.error);
        }
    }

    const OnClick = (e) => {
        e.preventDefault();
        resetPwd();
    }

    return (
        <div>
             <Typography variant="h6" color="primary">Reset Your Password </Typography>
            <form>
                <div>
                    <input type="text"
                        placeholder="Enter your email or username"
                        value={value} onChange={e=>setValue(e.target.value)}
                    />
                </div>
                <Button type="submit" variant="contained" color="primary"
                    onClick={OnClick}>Comfirm</Button>
            </form>
        </div>
        )
}

export default RequestResetPwd;