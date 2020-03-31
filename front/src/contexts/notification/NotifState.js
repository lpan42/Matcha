import React, { useReducer } from 'react';
import axios from 'axios';
import NotifContext from './notifContext';
import NotifReducer from './notifReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
    GET_NOTIF,
    READ_NOTIF,
    CLEAR_NOTIF,
 } from '../types';
 
 const NotifState = props => {
    const initialState = {
        notif: null,
        loading: true,
        error: null,
        success: null
    }

    const [state, dispatch] = useReducer(NotifReducer, initialState);

    const getNotif = async () => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get('/user/notif/get_notif');
            dispatch({
                type: GET_NOTIF,
                payload: result.data
            });
        }catch(err){
            console.log(err);
        }
    }
    
    const readNotif = async (id_notif) => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get(`/user/notif/read/${id_notif}`);
            dispatch({
                type: READ_NOTIF,
                payload: result.data
            });
        }catch(err){
            console.log(err);
        }
    }
    const clearNotif = () => {
        dispatch({
            type: CLEAR_NOTIF
        })
    }
 
    return (
        <NotifContext.Provider
            value={{
                notif: state.notif,
                loading: state.loading,
                error: state.error,
                success: state.success,
                getNotif,
                readNotif,
                clearNotif,
            }}
        >
        {props.children}
        </NotifContext.Provider>
    )
 }
 export default NotifState;