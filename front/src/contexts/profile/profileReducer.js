import {
    GET_PROFILE,
    GET_PROFILE_NO,
    CLEAR_MESSAGE,
    GET_INTERESTS_LIST,
    UPDATE_INTERESTS,
    UPDATE_PROFILE,
    NORMAL_ERROR,
} from '../types';


export default (state, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return{
                ...state,
                loading:false,
                profile: action.payload,
            }
        case GET_PROFILE_NO:
            return{
                ...state,
                emptyProfile: action.payload,
                error: null,
                loading: false
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                error: null,
                success: null
            }
        case GET_INTERESTS_LIST:
            return {
                ...state,
                interests_list: action.payload,
                error: null,
                success: null
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case UPDATE_INTERESTS:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}