import React, { useReducer } from 'react';
import axios from 'axios';
import ProfileContext from './profileContext';
import ProfileReducer from './profileReducer';
import setAuthToken from '../../utils/setAuthToken';
import validateToken from '../../utils/validateToken';
import io from 'socket.io-client';

import {
    GET_PROFILE, 
    GET_PROFILE_NO, 
    GET_INTERESTS_LIST,
    CLEAR_SUCCESS,
    CLEAR_ERROR,
    // UPDATE_INTERESTS,
    UPDATE_PROFILE,
    CHECK_LIKE,
    ADD_LIKE,
    UN_LIKE,
    NORMAL_ERROR,
    CLEAR_PROFILE,
    UPDATE_AVATAR,
    // UPLOAD_PICTURES,    
    // MODIFY_PICTURES,
    BLOCK_USER,
} from '../types';

let socket;

const ProfileState = props => {
    if(!socket){
        socket = io.connect(':8000');
    }

    const initialState = {
        profile: null,
        emptyProfile: null,
        interests_list: null,
        like: false,
        connected: false,
        loading: true,
        error: null,
        success: null
    }

    const [state, dispatch] = useReducer(ProfileReducer, initialState);

    const getProfile = async (userid) => {
        setAuthToken(localStorage.token);
        const loginUser = validateToken(localStorage.token);
        try{
            const result =  await axios.get(`/user/profile/${userid}`);
            dispatch({
                type: GET_PROFILE,
                payload: result.data
            });
            if(+loginUser !== +userid){
                let data = {
                    notification: 'visits',
                    id_user: userid,
                    id_sender: loginUser
                }
                socket.emit('addNotif', data);
            }
        }catch(err){
            dispatch({
                type: GET_PROFILE_NO,
                payload: err.response
            });
        }
    }

    const getInterestsList = async () => {
        try{
            const result =  await axios.get('/user/interests_list');
            dispatch({
                type: GET_INTERESTS_LIST,
                payload: result.data
            });
        }
        catch(err){
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response
            });
        }
    }

    const updateProfile = async (profile) => {
        setAuthToken(localStorage.token);
        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        try{
            const result =  await axios.post('/user/modify/profile', profile, config);
            dispatch({
                type: UPDATE_PROFILE,
                payload: result.data.success
            });
        }catch(err){
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response
            });
        }
    }

    const updateInterests = async (formData) => {
        setAuthToken(localStorage.token);
        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        try{
            await axios.post('/user/modify/interests', formData, config);
            // dispatch({
            //     type: UPDATE_INTERESTS
            // });
        }catch(err){
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response.data.error
            });
        }
    }
    
    const uploadPictures = async (formData) => {
        setAuthToken(localStorage.token);
        const config = {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        try{
            await axios.post('/user/upload/pictures', formData, config);
            // dispatch({
            //     type: UPLOAD_PICTURES
            // });
        }catch(err){
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response
            });
        }
    }

    const modifyPictures = async (data) => {
        setAuthToken(localStorage.token);
        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        try{
            await axios.post('/user/modify/pictures', data, config);
            // dispatch({
            //     type: MODIFY_PICTURES
            // });
        }catch(err){
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response
            });
        }
    }

    const checkLike = async(userid) => {
        setAuthToken(localStorage.token);
        try{
            const result = await axios.get(`/user/checklike/${userid}`);
            dispatch({
                type: CHECK_LIKE,
                payload: result.data
            });
        }catch(err){
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response
            });
        }
    }

    const addLike = async (userid) => {
        setAuthToken(localStorage.token);
        const loginUser = validateToken(localStorage.token);
        try{
            const result = await axios.post(`/user/like/${userid}`);
            dispatch({
                type: ADD_LIKE,
                payload: result.data
            });
            if(loginUser !== userid){
                let data = {
                    notification: 'likes',
                    id_user: userid,
                    id_sender: loginUser
                }
                socket.emit('addNotif', data);
            }
        }catch(err){
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response
            });
        }
    }

    const unLike = async (userid) => {
        setAuthToken(localStorage.token);
        const loginUser = validateToken(localStorage.token);
        try{
            const result = await axios.post(`/user/unlike/${userid}`);
            dispatch({
                type: UN_LIKE,
                payload: result.data
            });
            if(loginUser !== userid){
                let data = {
                    notification: 'unlikes',
                    id_user: userid,
                    id_sender: loginUser
                }
                socket.emit('addNotif', data);
            }
        }catch(err){
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response
            });
        }
    }

    const blockUser = async (userid) => {
        setAuthToken(localStorage.token);
        const loginUser = validateToken(localStorage.token);
        try{
            if(loginUser !== userid){
                let data = {
                    notification: 'blocks',
                    id_user: userid,
                    id_sender: loginUser
                }
                socket.emit('addNotif', data);
            }
            const result = await axios.post(`/user/block/${userid}`);
            dispatch({
                type: BLOCK_USER,
                payload: result.data
            });
        }catch(err){
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response
            });
        }
    }
    const reportFake = async (userid) => {
        setAuthToken(localStorage.token);
        const loginUser = validateToken(localStorage.token);
        try{
            if(loginUser !== userid){
                let data = {
                    notification: 'blocks',
                    id_user: userid,
                    id_sender: loginUser
                }
                socket.emit('addNotif', data);
            }
            const result = await axios.post(`/user/reportfake/${userid}`);
            dispatch({
                type: BLOCK_USER,
                payload: result.data
            });
        }catch(err){
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response
            });
        }
    }

    const clearProfile = () => {
        dispatch({
            type: CLEAR_PROFILE
        })
    }
    
    const updateAvatar = async (formData) => {
        setAuthToken(localStorage.token);
        const config = {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        try{
            const result = await axios.post('/user/upload/avatar', formData, config);
            dispatch({
                type: UPDATE_AVATAR,
                payload: result.data.success
            });
        }catch(err){
            console.log(err);
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response
            });
        }
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
        <ProfileContext.Provider
            value={{
                profile: state.profile,
                emptyProfile: state.emptyProfile,
                loading: state.loading,
                like: state.like,
                connected: state.connected,
                error: state.error,
                success: state.success,
                interests_list: state.interests_list,
                getProfile,
                getInterestsList,
                updateProfile,
                updateInterests,
                checkLike,
                addLike,
                unLike,
                clearProfile,
                updateAvatar,
                uploadPictures,
                modifyPictures,
                blockUser,
                clearError,
                clearSuccess,
                reportFake,
            }}
        >
        {props.children}
        </ProfileContext.Provider>
    )
}
export default ProfileState;