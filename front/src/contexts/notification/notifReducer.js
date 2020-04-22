import {
    GET_NOTIF,
    READ_NOTIF,
    CLEAR_NOTIF,
    NORMAL_ERROR,
    SET_ALL_READED
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
                    notif:action.payload.data,
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
            case SET_ALL_READED:
                return{
                    ...state,
                    notif:action.payload.data,
                    loading:false,
                    error: null,
                    success: null
                }
            case NORMAL_ERROR:
                return {
                    ...state,
                    loading: false,
                    error:action.payload
                }
        default:
            return state;
    }
}