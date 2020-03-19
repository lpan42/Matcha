import {
    GET_PROFILE,
    GET_PROFILE_NO,
    CLEAR_MESSAGE,
    GET_INTERESTS_LIST,
    UPDATE_INTERESTS,
    UPDATE_PROFILE,
    CHECK_LIKE,
    ADD_LIKE,
    NORMAL_ERROR,
    UN_LIKE,
    CLEAR_PROFILE,
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
        case CHECK_LIKE:
            return {
                ...state,
                loading: false,
                like:action.payload,
            }
        case ADD_LIKE:
            return {
                ...state,
                loading: false,
                like:true,
                success:action.payload
            }
        case UN_LIKE:
            return {
                ...state,
                loading: false,
                like: false,
                success:action.payload
            }
        case NORMAL_ERROR:
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                emptyProfile: null,
                interests_list: null,
                like: false,
                loading: true,
                error: null,
                success: null
            }
        default:
            return state;
    }
}