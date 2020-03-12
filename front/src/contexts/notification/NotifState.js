import React, { useReducer } from 'react';
import axios from 'axios';
import NotifContext from './notifContext';
import NotifReducer from './notifReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
    GET_UNREAD_MESSAGE,
    CLEAR_NOTIF,
    CLEAR_MESSAGE
 } from '../types';
 
 const NotifState = props => {
    const initialState = {
        unread: null,
        loading: true,
        error: null,
        success: null
    }

    const [state, dispatch] = useReducer(NotifReducer, initialState);

    const get_unread_message = async () => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get('/user/notif/unread');
            dispatch({
                type: GET_UNREAD_MESSAGE,
                payload: result.data
            });
        }catch(err){
               console.log(err);
        }
    }
    
    const clearNotif = async () =>{
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get('/user/notif/clear');
            dispatch({
                type: CLEAR_NOTIF,
                payload: result.data.success
            });
        }catch(err){
               console.log(err);
        }
    }

    const clearMessage = () => {
        dispatch({
            type: CLEAR_MESSAGE
        })
    }
    return (
        <NotifContext.Provider
            value={{
                unread: state.unread,
                loading: state.loading,
                error: state.error,
                success: state.success,
                get_unread_message,
                clearNotif,
                clearMessage,
            }}
        >
        {props.children}
        </NotifContext.Provider>
    )
 }
 export default NotifState;