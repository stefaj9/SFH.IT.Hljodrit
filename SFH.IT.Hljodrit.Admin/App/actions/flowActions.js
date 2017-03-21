import fetch from 'isomorphic-fetch';
import { toastr } from 'react-redux-toastr';

export function resetRegisterId() {
    return {
        type: 'RESET_REGISTER_ID',
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
                'Content-Type': 'application/json'
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

function registerSuccess(data) {
    return {
        type: 'REGISTER_INDIVIDUAL',
        payload: data
    };
};

function isRegisteringIndividual() {
    return {
        type: 'IS_REGISTERING_INDIVIDUAL',
        payload: {}
    };
};

function hasStoppedRegisteringIndividual() {
    return {
        type: 'HAS_STOPPED_REGISTERING_INDIVIDUAL',
        payload: {}
    };
};

export function isFetchingList() {
    return {
        type: 'IS_FETCHING_LIST',
        payload: {}
    };
};

export function hasStoppedFetchingList() {
    return {
        type: 'HAS_STOPPED_FETCHING_LIST',
        payload: {}
    };
};