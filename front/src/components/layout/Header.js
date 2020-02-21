//rce from es7 react extension
import React, { Fragment, useContext }from 'react';
import PropTypes from 'prop-types';//shortcut impt 
import { Link } from 'react-router-dom';//import from default does not need {}
import AuthContext from '../../contexts/auth/authContext';

const Header = ({ title }) => {
    const authContext = useContext(AuthContext);

    const { token, logout, user } = authContext;

    const onLogout = () => {
        logout();
    }

    const authLinks = (
        <Fragment>
            <li>Hello, {user && user.data.username}</li>
            <li>
                <a onClick={onLogout} href="#!">Logout</a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
        </Fragment>
    )

    return (
        <nav className='navbar bg-primary'>
            <h1><Link to='/'>{title}</Link></h1>
            <ul>
                {token ? authLinks : guestLinks}
            </ul>
        </nav>
    )
}

Header.defaultProps = {title : 'Matcha'};

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header
