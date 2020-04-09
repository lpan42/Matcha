import React, { useReducer } from 'react';
import axios from 'axios';
import ChatContext from './chatContext';
import ChatReducer from './chatReducer';
import setAuthToken from '../../utils/setAuthToken';
import io from 'socket.io-client';

import {
    GET_FRIENDS_LIST,
    GET_CHAT_MSGS,
    NORMAL_ERROR,
 } from '../types';

let socket;

 const ChatState = props => {
    if(!socket){
        socket = io(':8000');
    }

    const initialState = {
        friendsList: null,
        chatMsgs: null,
        loading: true,
        error: null,
    }
    const [state, dispatch] = useReducer(ChatReducer, initialState);
 
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

    const getChatMegs = async (id_chatroom) => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get(`/chat/chatroom/${id_chatroom}`);
            dispatch({
                type: GET_CHAT_MSGS,
                payload: result.data.data
            });
        }catch(err){
            console.log(err);
            // dispatch({
            //     type: NORMAL_ERROR,
            //     payload: err.response.data.error
            // });
        }
    }

    return (
        <ChatContext.Provider
            value={{
                friendsList: state.friendsList,
                chatMsgs: state.chatMsgs,
                loading: state.loading,
                error: state.error,
                getFriendsList,
                getChatMegs,
            }}
        >
        {props.children}
        </ChatContext.Provider>
    )
 }
 export default ChatState;