import React, { useReducer } from 'react';
import axios from 'axios';
import ProfileContext from './profileContext';
import ProfileReducer from './profileReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
    GET_PROFILE, 
    GET_PROFILE_NO, 
    CLEAR_MESSAGE, 
    GET_INTERESTS_LIST,
    UPDATE_INTERESTS,
    UPDATE_PROFILE,
    CHECK_LIKE,
    ADD_LIKE,
    UN_LIKE,
    NORMAL_ERROR,
    CLEAR_PROFILE,
} from '../types';

const ProfileState = props => {
    const initialState = {
        profile: null,
        emptyProfile: null,
        interests_list: null,
        like: false,
        loading: true,
        error: null,
        success: null
    }

    const [state, dispatch] = useReducer(ProfileReducer, initialState);

    const getProfile = async (userid) => {
        setAuthToken(localStorage.token);
        try{
            const result =  await axios.get(`/user/profile/${userid}`);
            dispatch({
                type: GET_PROFILE,
                payload: result.data
            });
        }catch(err){
            dispatch({
                type: GET_PROFILE_NO,
                payload: err.response.data.error
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
        }
    }

    const updateProfile = async (formData) => {
        setAuthToken(localStorage.token);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const result =  await axios.post('/user/modify/profile', formData, config);
            dispatch({
                type: UPDATE_PROFILE,
                payload: result.data.success
            });
        }catch(err){
        }
    }

    const updateInterests = async (formData) => {
        setAuthToken(localStorage.token);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            await axios.post('/user/modify/interests', formData, config);
            dispatch({
                type: UPDATE_INTERESTS
            });
        }catch(err){
        }
    }
    const checkLike = async(userid) => {
        setAuthToken(localStorage.token);
        try{
            const result = await axios.get(`/user/checklike/${userid}`);
            dispatch({
                type: CHECK_LIKE,
                payload: result.data.like
            });
        }catch(err){
            console.log(err);
        }
    }

    const addLike = async (userid) => {
        setAuthToken(localStorage.token);
        try{
            const result = await axios.post(`/user/like/${userid}`);
            dispatch({
                type: ADD_LIKE,
                payload: result.data.success
            });
        }catch(err){
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response.data.error
            });
        }
    }

    const unLike = async (userid) => {
        setAuthToken(localStorage.token);
        try{
            const result = await axios.post(`/user/unlike/${userid}`);
            dispatch({
                type: UN_LIKE,
                payload: result.data.success
            });
        }catch(err){
            dispatch({
                type: NORMAL_ERROR,
                payload: err.response.data.error
            });
        }
    }
    const clearProfile = () => {
        dispatch({
            type: CLEAR_PROFILE
        })
    }

    const clearMessage = () => {
        dispatch({
            type: CLEAR_MESSAGE
        })
    }
    
    return (
        <ProfileContext.Provider
            value={{
                profile: state.profile,
                emptyProfile: state.emptyProfile,
                loading: state.loading,
                like: state.like,
                error: state.error,
                success: state.success,
                interests_list: state.interests_list,
                getProfile,
                getInterestsList,
                updateProfile,
                updateInterests,
                clearMessage,
                checkLike,
                addLike,
                unLike,
                clearProfile,
            }}
        >
        {props.children}
        </ProfileContext.Provider>
    )
}
export default ProfileState;