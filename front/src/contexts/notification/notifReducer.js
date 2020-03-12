import {
    GET_UNREAD_MESSAGE,
    CLEAR_NOTIF,
    CLEAR_MESSAGE,
} from '../types';


export default (state, action) => {
    switch (action.type) {
        case GET_UNREAD_MESSAGE:
            return{
                ...state,
                loading:false,
                unread: action.payload,
            }
            case CLEAR_NOTIF:
                return{
                    ...state,
                    unread:null,
                    loading:false,
                    success: action.payload,
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