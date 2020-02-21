//race/
import React, { useContext }from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { token, loading } = authContext;

    return (
        <Route {...rest } 
            render={ props => !token && !loading ? (
            <Redirect to='/login' />
            ) : (
                <Component {...props} />
            )} 
        />
    )
}

export default PrivateRoute
