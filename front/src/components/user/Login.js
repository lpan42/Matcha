import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/user/userContext';
import NotifContext from '../../contexts/notification/notifContext';
import ProfileContext from '../../contexts/profile/profileContext';
import { toast } from 'react-toastify';
import ChatContext from '../../contexts/chat/chatContext';

const Login = (props) => {
    const userContext = useContext(UserContext);
    const notifContext = useContext(NotifContext);
    const  profileContext = useContext(ProfileContext);
    const chatContext = useContext(ChatContext);

    const { login, error, token, user, success, clearError, clearSuccess} = userContext;
    const { getProfile} = profileContext;
    const { getNotif } = notifContext;
    const { getChatNotif } = chatContext;
    
    useEffect(() => {
        if(token && user){
            getNotif();
            getChatNotif(user && user.data.id);
            getProfile(user && user.data.id);
            props.history.push('/');
        }
        if(error) {
            toast.error(error);
            clearError();
        }
        if(success) {
            toast.success(success);
            clearSuccess();
        }
        //eslint-disable-next-line
    }, [token, user, props.history, error, success]);
    
    const [loginUser, setLoginUser] = useState({
        username: '',
        password: '',
    })
    const { username, password } = loginUser;
    
    const onChange = e => {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        if(username === '' || password === ''){
            toast.warning('All the fields need to be filled');
        }
        else{
           login({
               username,
               password
           });
        }
    }
    return (
        <div className='form-container'>
            <h1>
               <span className='text-primary'> Login </span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type='text' name='username' value={username} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type='password' name='password' value={password} onChange={onChange} />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
            <p>Don't have an account? <Link to='Register'> Register</Link></p>
            <p>Forget your password? <Link to='resetpwd_request'> Reset Password</Link></p>
        </div>
    )
}

export default Login;

