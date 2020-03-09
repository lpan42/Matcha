import {
    GET_UNREAD_MESSAGE,

} from '../types';


export default (state, action) => {
    switch (action.type) {
        case GET_UNREAD_MESSAGE:
            return{
                ...state,
                loading:false,
                unread: action.payload,
            }

        default:
            return state;
    }
}