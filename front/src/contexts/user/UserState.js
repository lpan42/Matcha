import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import UserReducer from './userReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   CLEAR_MESSAGE,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOAD_USER,
   AUTH_ERROR,
   LOGOUT,
   EDIT_ACCOUNT_FAIL,
   EDIT_ACCOUNT_SUCCESS,
   NORMAL_ERROR
} from '../types';

const UserState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        user: null,
        loading: true,
        error: null,
        success: null,
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

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
                payload: result.data.success
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
            })
        }
    }
    
    const logout = async () => {
        setAuthToken(localStorage.token);
        try {
            const result = await axios.get('/user/logout');
            dispatch({
                type: LOGOUT, 
                payload: result.data.success
            })
        } catch (err) {
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response.data.error
            })
        }
    }
    const clearMessage = () => {
        dispatch({
            type: CLEAR_MESSAGE
        })
    }

    const editAccount = async (formData) => {
        setAuthToken(localStorage.token);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const result =  await axios.post('/user/modify/account', formData, config);
            dispatch({
                type: EDIT_ACCOUNT_SUCCESS,
                payload: result.data.success
            });
            loadUser();
        }catch(err){
            dispatch({
                type: EDIT_ACCOUNT_FAIL,
                payload: err.response.data.error
            });
        }
    }

    return (
        <UserContext.Provider
            value={{
                token: state.token,
                loading: state.loading,
                user: state.user,
                error: state.error,
                success: state.success,
                register,
                clearMessage,
                login,
                loadUser,
                logout,
                editAccount,
            }}
        >
        {props.children}
        </UserContext.Provider>
    )
}

export default UserState;