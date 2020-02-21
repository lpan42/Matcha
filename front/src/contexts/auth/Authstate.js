import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   CLEAR_MESSAGE,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOAD_USER,
   AUTH_ERROR,
   LOGOUT
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        // isAuthenticated: false,
        user: null,
        loading: true,
        error: null,
        success: null,
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const register = async formData =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const result =  await axios.post('/user/register', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: result.data.message
            });
        }catch(err){
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.error
            });
        }
    }
    
    const login = async formData =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const result =  await axios.post('/user/login', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: result.data
            });
            loadUser();
        }catch(err){
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.error
            });
        }
    }

    const loadUser = async () => {
        setAuthToken(localStorage.token);
        try {
            const result = await axios.get('/user/auth');
            dispatch({
                type: LOAD_USER, 
                payload: result.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR, 
                // payload: err.response.data.error
            })
        }
    }
    const logout = () => {
        dispatch({
            type: LOGOUT, 
        })
    }
    const clearMessage = () => {
        dispatch({
            type: CLEAR_MESSAGE
        })
    }
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                // isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                success: state.success,
                register,
                clearMessage,
                login,
                loadUser,
                logout,
            }}
        >
        {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;