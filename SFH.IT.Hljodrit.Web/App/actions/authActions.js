import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';

export function registerUser(name, email, password, confirmPassword) {
    return (dispatch) => {
        dispatch(isRegistering());
        return fetch('/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `Name=${name}&Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}`
        }).then(resp => {
            dispatch(hasStoppedRegistering());
            if (resp.ok) {
                toastr.success('Tókst!', 'Nýskráning tókst. Innan skamms mun þér berast póstur til þess að staðfesta netfangið þitt.');
                browserHistory.push('/');
            } else {
                return resp.json();
            }
        }).then(data => {
            if (data) {
                if (data.hasOwnProperty('ModelState')) {
                    let errorStates = data['ModelState'][''];
                    if (errorStates.length > 1) {
                        toastr.error('Villa!', errorStates[1]);
                    } else {
                        toastr.error('Villa!', 'Ekki tókst að nýskrá. Vinsamlegast reyndu aftur síðar.');
                    }
                }
            }
        });
    }
}

export function logoutUser() {
    browserHistory.push('/');
    return {
        type: types.LOGOUT,
        payload: {}
    };
};

export function loginUser(username, password) {
    return (dispatch) => {
        dispatch(isLoggingIn());
        return fetch('/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=password&username=${username}&password=${password}`
        }).then(resp => {
            dispatch(hasStoppedLoggingIn());
            return resp.json();
        }).then(data => {
            if (data.hasOwnProperty('error')) {
                toastr.error('Villa!', data.error_description);
            } else {
                toastr.success('Tókst!', 'Innskráning tókst.');
                browserHistory.push('/projects');
                dispatch(loginUserSuccess(data));
            }
        });
    }
}

function loginUserSuccess(user) {
    return {
        type: types.LOGIN_USER,
        payload: user
    };
};

function isLoggingIn() {
    return {
        type: types.IS_LOGGING_IN,
        payload: {}
    };
};

function hasStoppedLoggingIn() {
    return {
        type: types.HAS_STOPPED_LOGGING_IN,
        payload: {}
    };
};

function isRegistering() {
    return {
        type: types.IS_REGISTERING,
        payload: {}
    };
};

function hasStoppedRegistering() {
    return {
        type: types.HAS_STOPPED_REGISTERING,
        payload: {}
    };
};