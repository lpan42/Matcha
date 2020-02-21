import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AlertContext from '../../contexts/alert/alertContext';
import AuthContext from '../../contexts/auth/authContext';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearMessage, token } = authContext;

    useEffect(() => {
        if(token){
            props.history.push('/');//redirect
        }
        if(error) {
            setAlert(error, 'danger');
            clearMessage();
        }
        //eslint-disable-next-line
    }, [error, token, props.history]);
    
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
            Don't have an account? <Link to='Register'>Register</Link>
        </div>
    )
}

export default Login;

