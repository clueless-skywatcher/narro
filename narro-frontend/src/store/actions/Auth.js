import * as ActionTypes from './ActionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: ActionTypes.AUTH_START
    }
}

export const authSuccess = (token, username) => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        token: token,
        currentUser: username
    }
}

export const authFailure = error => {
    return {
        type: ActionTypes.AUTH_FAILURE,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('currentUser');
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = expirationDate => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationDate * 1000);
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        console.log({
            username, password
        })
        axios.post("http://127.0.0.1:8000/rest-auth/login/", {
            username: username,
            password: password
        })
        .then((res) => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('currentUser', username);
            dispatch(authSuccess(token, username));
            dispatch(checkAuthTimeout(3600));
        }).catch(err => {
            dispatch(authFailure(err));
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post("http://127.0.0.1:8000/rest-auth/registration/", {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then((res) => {
            console.log(res.data);
            if (res.status !== 200){
                throw new Error(res.data);
            }
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('currentUser', username);
            dispatch(authSuccess(token, username));
            dispatch(checkAuthTimeout(3600));
        }).catch(err => {
            dispatch(authFailure(err));
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('currentUser');
        if (token === undefined){
            dispatch(authLogout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(authLogout());
            }
            else {
                dispatch(authSuccess(token, username));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}