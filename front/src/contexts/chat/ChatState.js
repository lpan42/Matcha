import React, { useReducer } from 'react';
import axios from 'axios';
import ChatContext from './chatContext';
import ChatReducer from './chatReducer';
import setAuthToken from '../../utils/setAuthToken';
import io from 'socket.io-client';

import {
    GET_FRIENDS_LIST,
    GET_CHAT_MSGS,
    GET_CHAT_NOTIF,
    NORMAL_ERROR,
    CLEAR_SUCCESS,
    CLEAR_ERROR,
    CLEAR_CHAT_NOTIF,
 } from '../types';

let socket;

 const ChatState = props => {
    if(!socket){
        socket = io.connect(':8000');
    }

    const initialState = {
        friendsList: null,
        chatNotif: null,
        chatMsgs: null,
        loading: true,
        error: null,
    }
    const [state, dispatch] = useReducer(ChatReducer, initialState);
 
    const getChatNotif = async () => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get('/chat/getunread');
            dispatch({
                type: GET_CHAT_NOTIF,
                payload: result.data.data
            });
        }catch(err){
            console.log(err);
        }
    }
    const readChatNotif = async (id_chatroom) => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.post(`/chat/read/${id_chatroom}`);
            // dispatch({
            //     type: GET_CHAT_NOTIF,
            //     payload: result.data.data
            // });
        }catch(err){
            console.log(err);
        }
    }

    const getFriendsList = async () => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get('/chat/friendslist');
            dispatch({
                type: GET_FRIENDS_LIST,
                payload: result.data.data
            });
        }catch(err){
            console.log(err);
        }
    }
    const joinRoom = (id_chatroom) => {
        const token = localStorage.token;
        socket.emit('joinRoom', {token, id_chatroom},(err) => {
            if(err) {
                dispatch({
                    type: NORMAL_ERROR,
                    payload: err
                });
            }
        });
        socket.on('getMessage', result => {
            dispatch({
                type: GET_CHAT_MSGS,
                payload: result
            });
        })
    }

    const addMessage = (newMessage, id_chatroom) => {
        const token = localStorage.token;
        socket.emit('addMessage', {id_chatroom, token, newMessage},(err) => {
            if(err) {
                dispatch({
                    type: NORMAL_ERROR,
                    payload: err
                });
            }
        });
        socket.on('getMessage', result => {
            dispatch({
                type: GET_CHAT_MSGS,
                payload: result
            });
        })
    }
    const clearChatNotif = () => {
        dispatch({
            type: CLEAR_CHAT_NOTIF
        })
    }
 
    const clearError = () => {
        dispatch({
            type: CLEAR_ERROR,
        });
    }

    const clearSuccess = () => {
        dispatch({
            type: CLEAR_SUCCESS,
        });
    }

    return (
        <ChatContext.Provider
            value={{
                friendsList: state.friendsList,
                chatMsgs: state.chatMsgs,
                chatNotif: state.chatNotif,
                loading: state.loading,
                error: state.error,
                getFriendsList,
                getChatNotif,
                readChatNotif,
                addMessage,
                joinRoom,
                clearError,
                clearSuccess,
                clearChatNotif,
            }}
        >
        {props.children}
        </ChatContext.Provider>
    )
 }
 export default ChatState;