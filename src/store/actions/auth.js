import { AUTH_SUCCESS } from '../actions/actionTypes';
import * as uiActions from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs.js';

const API_KEY = 'AIzaSyA2WDCk8VRu7cMRqixY9YMPVTO_zWyk6m0';
const BASE_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';

const authSuccess = authData => ({
    type: AUTH_SUCCESS,
    authData
})

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        const url = `${BASE_URL}${authMode === 'login' ? 'verifyPassword' : 'signupNewUser'}?key=${API_KEY}`;

        dispatch(uiActions.uiStartLoading())
        fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            .then(res => res.json())
            .then(authData => {
                if (authData.error) {
                    throw new Error(authData.error.message);
                }
                dispatch(uiActions.uiStopLoading());
                dispatch(authSuccess(authData));
                startMainTabs();
            })
            .catch(error => {
                console.warn(error.message);
                return dispatch(uiActions.uiStopLoading());
            })
    }
}

export const authGetToken = () =>
    (dispatch, getState) => new Promise((resolve, reject) => {
        const token = getState().auth.authData.idToken;
        if (!token) reject()
        resolve(token);
    });