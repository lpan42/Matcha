import {
    GET_FRIENDS_LIST, NORMAL_ERROR, GET_CHAT_MSGS
} from '../types';


export default (state, action) => {
    switch (action.type) {
        case GET_FRIENDS_LIST:
            return{
                ...state,
                loading:false,
                friendsList: action.payload,
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
        default:
            return state;
    }
}