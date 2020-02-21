import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_MESSAGE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER,
    AUTH_ERROR,
    LOGOUT
} from '../types';


export default (state, action) => {
    switch (action.type) {
        case LOAD_USER:
            return {
                ...state,
                // isAuthenticated:true,
                loading:false,
                user:action.payload
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                ...action.payload,
                success: action.payload,
                loading: false
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                // isAuthenticated: false,
                user: null,
                error: action.payload,
                loading: false
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                error: null,
                success: null
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                // isAuthenticated: true,
                loading: false
            }
        
        default:
            return state;
    }
}