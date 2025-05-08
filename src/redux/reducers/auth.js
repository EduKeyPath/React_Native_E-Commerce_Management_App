import {auth} from '../constants/auth';
const initialstate = {
    isLoginProcessing: false,
    isSuccess: false,
    isSignUpProcessing: false,
    isSignUpSuccess: false,
    isLoggedIn: false,
    userData: {},
    pagename: '',
    paymentData: {}
}

export default authReducer = (state=initialstate, action) => {
    switch (action.type) {
        case auth.SIGNIN:
            return {
                ...state,
                isLoginProcessing: true,
                isSuccess: false,
                isLoggedIn: false,
                userData: {}
            };
        case auth.SIGNIN_SUCCESS:
            return {
                ...state,
                isLoginProcessing: false,
                isSuccess: true,
                isLoggedIn: true,
                userData: action.data.userData,
                pagename: action.data.pagename
            };
        case auth.SIGNIN_ERROR:
            return {
                ...state,
                isLoginProcessing: false,
                isSuccess: false,
                isLoggedIn: false,
                userData: {}
            };
        case auth.SIGNUP:
            return {
                ...state,
                isSignUpProcessing: true,
                isSignUpSuccess: false,
                isLoggedIn: false,
                userData: {},
                paymentData: {}
            };
        case auth.SIGNUP_SUCCESS:
            return {
                ...state,
                isSignUpProcessing: false,
                isSignUpSuccess: true,
                isLoggedIn: true,
                userData: action.data.userData,
                paymentData: action.data.paymentData
            };
        case auth.SIGNUP_ERROR:
            return {
                ...state,
                isSignUpProcessing: false,
                isSignUpSuccess: false,
                isLoggedIn: false,
                userData: {},
                paymentData: {}
            };
        case auth.UPDATE_USER_DATA:
            return {
                ...state,
                userData: action.data
            };
        case auth.SET_USER_DATA:
            return {
                ...state,
                userData: action.data
            };
        case auth.LOGOUT:
            return {
                ...state,
                isLoginProcessing: false,
                isSuccess: false,
                isSignUpProcessing: false,
                isSignUpSuccess: false,
                isLoggedIn: false,
                userData: {}
            };
    
        default:
            return state;
    }
}