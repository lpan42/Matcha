import {
    GET_FRIENDS_LIST,
    GET_CHAT_NOTIF,
    NORMAL_ERROR,
    GET_CHAT_MSGS,
    CLEAR_SUCCESS,
    CLEAR_ERROR,
    CLEAR_NOTIF,
} from '../types';


export default (state, action) => {
    switch (action.type) {
        case GET_FRIENDS_LIST:
            return{
                ...state,
                loading:false,
                friendsList: action.payload,
            }
        case GET_CHAT_NOTIF:
            return {
                ...state,
                loading:false,
                chatNotif: action.payload,
            }
        case NORMAL_ERROR:
            return {
                ...state,
                loading:false,
                error: action.payload,
            }
        case GET_CHAT_MSGS:
            return {
                ...state,
                loading:false,
                chatMsgs:action.payload,
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
        case CLEAR_NOTIF:
            return {
                ...state,
                friendsList: null,
                chatNotif: null,
                chatMsgs: null,
                loading: true,
                error: null,
            }
        default:
            return state;
    }
}