import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';

export function registerUser(name, email, password, confirmPassword) {
    return () => {
        return fetch('/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `Name=${name}&Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}`
        }).then(resp => {
            if (resp.ok) {
                toastr.success('Tókst!', 'Nýskráning tókst. Innan skamms mun þér berast póstur til þess að staðfesta netfangið þitt.');
            } else {
                toastr.error('Villa!', 'Ekki tókst að nýskrá. Vinsamlegast reyndu aftur síðar.');
            }
        });
    }
}

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
                dispatch(loginUserSuccess(data.userName));
            }
        });
    }
}

function loginUserSuccess(userName) {
    return {
        type: types.LOGIN_USER,
        payload: userName
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