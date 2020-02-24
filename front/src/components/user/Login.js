import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AlertContext from '../../contexts/alert/alertContext';
import UserContext from '../../contexts/user/userContext';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const userContext = useContext(UserContext);

    const { setAlert } = alertContext;
    const { login, error, clearMessage, token, success } = userContext;

    useEffect(() => {
        if(token){
            props.history.push('/');//redirect
        }
        if(error) {
            setAlert(error, 'danger');
            clearMessage();
        }
        if(success) {
            setAlert(success, 'success');
            clearMessage();
        }
        //eslint-disable-next-line
    }, [error, token, props.history, success]);
    
    const [user, setUser] = useState({
        username: '',
        password: '',
    })
    const { username, password } = user;
    
    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        if(username === '' || password === ''){
            setAlert('All the fields need to be filled', 'danger');
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
            <p>Forget your password? <Link to='#'> Reset Password</Link></p>
        </div>
    )
}

export default Login;

