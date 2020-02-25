import {
    GET_PROFILE,
    GET_PROFILE_NO,
    CLEAR_MESSAGE
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
        default:
            return state;
    }
}