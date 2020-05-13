import {
    GET_PROFILE,
    GET_PROFILE_NO,
    GET_INTERESTS_LIST,
    UPDATE_INTERESTS,
    UPDATE_PROFILE,
    CHECK_LIKE,
    ADD_LIKE,
    NORMAL_ERROR,
    UN_LIKE,
    CLEAR_PROFILE,
    UPDATE_AVATAR,
    // UPLOAD_PICTURES,
    // MODIFY_PICTURES,
    BLOCK_USER,
    CLEAR_SUCCESS,
    CLEAR_ERROR
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
                loading: false
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
        // case UPDATE_PICTURES:
        //     return {
        //         ...state,
        //         loading: false,
        //     }
        case CHECK_LIKE:
            return {
                ...state,
                loading: false,
                like:action.payload.like,
                connected:action.payload.connected,
            }
        case ADD_LIKE:
            return {
                ...state,
                loading: false,
                like:true,
                connected:action.payload.connected,
                success:action.payload.success
            }
        case UN_LIKE:
            return {
                ...state,
                loading: false,
                like: false,
                connected:action.payload.connected,
                success:action.payload.success
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
        case UPDATE_AVATAR:
            return{
                ...state,
                loading: false,
                success: action.payload
            }
        case BLOCK_USER:
            return {
                ...state,
                loading: false,
                success: action.payload.success
            }
        case CLEAR_SUCCESS:
            return {
                ...state,
                success: null,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}