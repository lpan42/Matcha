import {
    GET_NOTIF,
    READ_NOTIF,
    CLEAR_MESSAGE,
    CLEAR_NOTIF,
} from '../types';


export default (state, action) => {
    switch (action.type) {
        case GET_NOTIF:
            return{
                ...state,
                loading:false,
                notif: action.payload,
            }
            case READ_NOTIF:
                return{
                    ...state,
                    notif:action.payload,
                    loading:false,
                    error: null,
                    success: null
                }
            
            case CLEAR_MESSAGE:
                return {
                    ...state,
                    loading:false,
                    error: null,
                    success: null
                }
            case CLEAR_NOTIF:
                return {
                    ...state,
                    notif: null,
                    loading: true,
                    error: null,
                    success: null
                }
        default:
            return state;
    }
}