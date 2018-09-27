import { AsyncStorage } from 'react-native';

import { AUTH_SUCCESS, AUTH_REMOVE_TOKEN } from '../actions/actionTypes';
import * as uiActions from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs.js';

import App from '../../../App';

const API_KEY = 'AIzaSyA2WDCk8VRu7cMRqixY9YMPVTO_zWyk6m0';
const BASE_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';

const authSuccess = (token, expiryDate) => ({
    type: AUTH_SUCCESS,
    token,
    expiryDate
})

const authStoreToken = (token, expiresIn, refreshToken) => dispatch => {
    const expiryDate = new Date().getTime() + expiresIn * 1000;

    dispatch(authSuccess(token, expiryDate));

    AsyncStorage.setItem('ap:auth:token', token);
    AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString());
    AsyncStorage.setItem('ap:auth:refreshToken', refreshToken);
}


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
                dispatch(authStoreToken(authData.idToken, authData.expiresIn, authData.refreshToken));
                startMainTabs();
            })
            .catch(error => {
                return dispatch(uiActions.uiStopLoading());
            })
    }
}

export const authGetToken = () =>
    (dispatch, getState) => new Promise((resolve, reject) => {
        // AsyncStorage.clear();
        const { token, expiryDate } = getState().auth;

        if (!token || new Date(expiryDate) <= new Date()) {
            return AsyncStorage.getItem('ap:auth:token')
                .catch(error => reject(error))
                .then(tokenFromStorage => {
                    if (!tokenFromStorage) return reject();
                    return AsyncStorage.getItem('ap:auth:expiryDate')
                        .then(expiryDateFromStorage => {
                            const parseExpiry = new Date(+expiryDateFromStorage);
                            if (parseExpiry > new Date()) {
                                dispatch(authSuccess(tokenFromStorage));
                                resolve(tokenFromStorage);
                            } else {
                                reject();
                            }
                        })
                        .catch(error => {
                            reject(error)
                        })
                });
        }
        resolve(token);
    });
export const autoAuth = () => dispatch => {
    dispatch(authGetToken())
        .then(token => {
            if (!token) throw new Error('No token')
            startMainTabs();
        })
        .catch(error => {
            AsyncStorage.getItem('ap:auth:refreshToken')
                .then((refreshToken) => {
                    if (!refreshToken) {
                        dispatch(authRefeshToken());
                        throw new Error('No refreshToken...')
                    }
                    dispatch(authRefeshToken(refreshToken));
                })
                .catch(() => dispatch(authClearStorage()))
        });
}

const authRefeshToken = refreshToken => dispatch =>
    fetch('https://securetoken.googleapis.com/v1/token?key=' + API_KEY, {
        method: 'POST',
        body: JSON.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    })
    .then(res => res.json())
    .then(authData => {
        if (authData.error) {
            throw new Error(authData.error.message);
        }
        dispatch(uiActions.uiStopLoading());
        dispatch(authStoreToken(authData.id_token, authData.expires_in, authData.refresh_token));
        startMainTabs();
    })
    .catch(error => {
        return dispatch(uiActions.uiStopLoading());
    })

export const authLogout = () => dispatch => {
    dispatch(authRemoveToken());
    dispatch(authClearStorage()).then(() => App());
}

const authRemoveToken = () => ({
    type: AUTH_REMOVE_TOKEN
})

const authClearStorage = () => dispatch => {
    AsyncStorage.removeItem('ap:auth:token');
    AsyncStorage.removeItem('ap:auth:expiryDate');
    return AsyncStorage.removeItem('ap:auth:refreshToken');
}