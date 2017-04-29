import fetch from 'isomorphic-fetch';
import { toastr } from 'react-redux-toastr';
import * as types from './actionTypes';

export function resetRegisterId() {
    return {
        type: types.RESET_REGISTER_ID,
        payload: {}
    };
};

export function register(individual, path) {
    return (dispatch) => {
        dispatch(isRegisteringIndividual());
        return fetch(path, {
            method: 'POST',
            body: JSON.stringify(individual),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('bt')
            }
        }).then((resp) => {
            if (resp.ok) {
                toastr.success('Tókst', 'Það tókst að nýskrá aðila.');
                return resp.json();
            } else {
                resp.json().then((err) => {
                    toastr.error('Villa', err.Message);
                });
                dispatch(hasStoppedRegisteringIndividual());
            }
        }).then((data) => {
            dispatch(hasStoppedRegisteringIndividual());
            dispatch(registerSuccess(data));
        });
    }
}

export function update(data, path, message, optionalSuccessCallback) {
    return (dispatch) => {
        dispatch(isUpdatingData());
        return fetch(path, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('bt')
            }
        }).then((resp) => {
            if (resp.ok) {
                toastr.success('Tókst', message);
                optionalSuccessCallback();
                return resp.json();
            } else {
                resp.json().then((err) => {
                    toastr.error('Villa', err.Message);
                });
                dispatch(hasStoppedUpdatingData());
            }
        }).then((data) => {
            dispatch(hasStoppedUpdatingData());
            dispatch(updateSuccess(data));
        });
    }
}

function isUpdatingData() {
    return {
        type: types.IS_UPDATING_DATA,
        payload: {}
    };
};

function hasStoppedUpdatingData() {
    return {
        type: types.HAS_STOPPED_UPDATING_DATA,
        payload: {}
    };
}

function updateSuccess(data) {
    return {
        type: types.UPDATE_DATA,
        payload: data
    };
};

function registerSuccess(data) {
    return {
        type: types.REGISTER_INDIVIDUAL,
        payload: data
    };
};

function isRegisteringIndividual() {
    return {
        type: types.IS_REGISTERING_INDIVIDUAL,
        payload: {}
    };
};

function hasStoppedRegisteringIndividual() {
    return {
        type: types.HAS_STOPPED_REGISTERING_INDIVIDUAL,
        payload: {}
    };
};

export function isFetchingList() {
    return {
        type: types.IS_FETCHING_LIST,
        payload: {}
    };
};

export function hasStoppedFetchingList() {
    return {
        type: types.HAS_STOPPED_FETCHING_LIST,
        payload: {}
    };
};
