import React, { useReducer } from 'react';
import axios from 'axios';
import NotifContext from './notifContext';
import NotifReducer from './notifReducer';
import setAuthToken from '../../utils/setAuthToken';
import io from 'socket.io-client';
import validateToken from '../../utils/validateToken';

import {
    GET_NOTIF,
    READ_NOTIF,
    CLEAR_NOTIF,
    SET_ALL_READED,
    NORMAL_ERROR,
 } from '../types';

 let socket;

 const NotifState = props => {
    if(!socket){
        socket = io.connect(':8000');
    }
    const initialState = {
        notif: null,
        loading: true,
        error: null,
        success: null
    }

    const [state, dispatch] = useReducer(NotifReducer, initialState);

    const getNotif = async () => {
        const token = localStorage.token;
        const loginUser = validateToken(localStorage.token);
        socket.emit('requestNotif', token, (err) => {
            if(err) {
                dispatch({
                    type: NORMAL_ERROR,
                    payload: err
                });
            }
        });
        socket.on('getNotif', result => {
            if(result.id_receiver === loginUser){
                  dispatch({
                    type: GET_NOTIF,
                    payload: result.data
                });
            }
        })
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
 
    const setAllReaded = async() =>{
        setAuthToken(localStorage.token);
        try{
            const result = await axios.get('/user/notif/allreaded');
            dispatch({
                type: SET_ALL_READED,
                payload: result.data
            });
        }catch(err){
            console.log(err);
        }
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
                setAllReaded,
            }}
        >
        {props.children}
        </NotifContext.Provider>
    )
 }
 export default NotifState;