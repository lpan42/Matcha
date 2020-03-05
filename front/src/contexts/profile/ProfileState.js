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
    NORMAL_ERROR,
    UPDATE_INTERESTS,
    UPDATE_PROFILE
} from '../types';

const ProfileState = props => {
    const initialState = {
        profile: null,
        emptyProfile: null,
        interests_list: null,
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
            console.log(err)
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
            console.log(err);
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
                // payload: result.data.success
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
        <ProfileContext.Provider
            value={{
                profile: state.profile,
                emptyProfile: state.emptyProfile,
                loading: state.loading,
                error: state.error,
                success: state.success,
                interests_list: state.interests_list,
                getProfile,
                getInterestsList,
                updateProfile,
                updateInterests,
                clearMessage
            }}
        >
        {props.children}
        </ProfileContext.Provider>
    )
}
export default ProfileState;