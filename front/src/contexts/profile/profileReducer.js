import {
    GET_PROFILE,
    NORMAL_ERROR,
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
        case NORMAL_ERROR:
            return{
                ...state,
                profile: null,
                error: action.payload,
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