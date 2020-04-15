import {
    GET_NOTIF,
    READ_NOTIF,
    CLEAR_NOTIF,
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
                    notif:action.payload,
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
                    notif:action.payload,
                    loading:false,
                    error: null,
                    success: null
                }
        default:
            return state;
    }
}