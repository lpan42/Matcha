//rafce
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ResetPwd = ({ match }) => {
    const [username, setUsername] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [pwd, setPwd] = useState('');
    const [rePwd, setRePwd] = useState('');

    const resetpwd_link = match.params.resetpwd_link;
    const history = useHistory();

    const VerifyResetPwdLink = async () => {
        try{
            const result = await axios.get(`/user/verifypwdlink/${resetpwd_link}`);
            setUsername(result.data.data);
            setSuccess(result.data.success);
        }catch(err){
            setError(err.response.data.error);
            history.push(`/resetpwd_request`);
        }
    }

    const updatePwd = async () => {
        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        const data = {
            username:username,
            password:pwd,
        }
        try{
            const result = await axios.post(`/user/updatepwd`, data, config);
            setSuccess(result.data.success);
            history.push(`/login`);
        }catch(err){
            setError(err.response.data.error);
        }
    }

    useEffect(() => {
        if(!username){
            VerifyResetPwdLink();
        }
        if(error) {
            toast.error(error);
        }
        if(success) {
            toast.success(success);
            // setSuccess('');
        }
        //eslint-disable-next-line
      }, [username, error, success]);

    const OnClick = (e) => {
        e.preventDefault();
        if(pwd === '' || rePwd === ''){
            toast.warning('All the fields need to be filled');
        }
        else if(pwd !== rePwd){
            toast.error('Two passwords unmatched');
        }else{
            updatePwd();
        }
    }
    
    return (
        <div>
            <Typography variant="h6" color="primary"> Update Your Password </Typography>
            <form>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" value={username} readOnly/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type='password' name='password' value={pwd} onChange={e=>setPwd(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="re_password">Comfirm password: </label>
                    <input type='password' name='re_password' value={rePwd} onChange={e=>setRePwd(e.target.value)} />
                </div>
                <Button type="submit" variant="contained" color="primary"
                   onClick={OnClick}>Comfirm</Button>
            </form>
        </div>
    )
}

export default ResetPwd
