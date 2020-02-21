import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AlertContext from '../../contexts/alert/alertContext';
import AuthContext from '../../contexts/auth/authContext';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const [user, setUser] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        re_password:''
    })

    const { setAlert } = alertContext;
    const { register, error, success, clearMessage, token } = authContext;

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

    useEffect(() => {
        if(error) {
            setAlert(error, 'danger');
            clearMessage();
        }
          //eslint-disable-next-line
    }, [error]);

    useEffect(() => {
        if(success) {
            setAlert(success, 'success');
            clearMessage();
            props.history.push('/login');
        }
          //eslint-disable-next-line
    }, [success]);

    const { username, email, firstname, lastname, password, re_password } = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        if(username === '' || email === '' || firstname === '' || lastname === '' || password === '' || re_password === ''){
            setAlert('All the fields need to be filled', 'danger');
        }
        else if(password !== re_password){
            setAlert('Two passwords unmatched', 'danger');
        }else{
            register({
                username,
                email,
                firstname,
                lastname,
                password
            });

        }
        
    }

    return (
        <div className='form-container'>
            <h1>
               <span className='text-primary'> Register </span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Username: </label>
                    <input type='text' name='username' value={username} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type='email' name='email' value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="firstname">Firstname: </label>
                    <input type='text' name='firstname' value={firstname} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Lastname: </label>
                    <input type='text' name='lastname' value={lastname} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type='password' name='password' value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="re_password">Comfirm password: </label>
                    <input type='password' name='re_password' value={re_password} onChange={onChange} />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
            Have an account? <Link to='Login'>Login</Link>
        </div>
    )
}

export default Register;

