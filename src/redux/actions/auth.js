import {Storage} from '../../Helper/storage';
import {auth} from '../constants/auth';
import {callApi} from '../../Helper/api';
import {error as notifyError, success as notifySuccess} from '../../Utils/notify'
//Login
export function signin(data) {
    return async (dispatch) => {
        try {
            dispatch({ type: auth.SIGNIN });
            const res = await callApi('POST', `act=auth&section=signIn`, data);
            if (res.data.error) {
                console.log(res.data.error);
                dispatch({ type: auth.SIGNIN_ERROR });
                notifyError(res.data.error.message);
            }
            else {
                let result = res.data.result || {};
                let userData = {...result.user, token : result.token}
                Storage.setItem('user', JSON.stringify(userData));
                notifySuccess(result.message);
                dispatch({ type: auth.SIGNIN_SUCCESS, data: {userData: userData} });
            }
        } catch (e) {
            console.log(e);
            dispatch({ type: auth.SIGNIN_ERROR });
        }
    }
}

//Register
export function signup(data) {
    return async (dispatch) => {
        try {
            dispatch({ type: auth.SIGNUP });
            let formData    =   {...data};
            delete formData.type;
            //return false;
            const res = await callApi('POST', `act=${data.type.toLowerCase()}&section=register`, data);
            if (res.data.error) {
                console.log(res.data.error);
                dispatch({ type: auth.SIGNUP_ERROR });
                notifyError(res.data.error);
            }
            else {
                let result = res.data.result || {};
                Storage.setItem('user', JSON.stringify(result.userData));
                notifySuccess(result.message);
                dispatch({ type: auth.SIGNUP_SUCCESS, data: {userData: result.userData, paymentData: result.paymentData} });
                /* setTimeout(() => {
                    dispatch({ type: TYPE.SIGNIN_SUCCESS, data: res.data.result });
                }, 3000); */
            }
        } catch (e) {
            console.log(e);
            dispatch({ type: auth.SIGNUP_ERROR });
        }
    }
}


export function updateUserData(data) {
    return async (dispatch) => {
        try {
            Storage.setItem('user', JSON.stringify(data));
            dispatch({ type: auth.UPDATE_USER_DATA, data: data });
        } catch (e) {
            console.log(e);
        }
    }
}


export function setUserData(data) {
    return async (dispatch) => {
        try {
            dispatch({ type: auth.SET_USER_DATA, data: data });
        } catch (e) {
            console.log(e);
        }
    }
}


export function logout(data) {
    return async (dispatch) => {
        try {
            dispatch({ type: auth.LOGOUT });
        } catch (e) {
            console.log(e);
            //dispatch({ type: TYPE.SIGNIN_ERROR });
        }
    }
}
