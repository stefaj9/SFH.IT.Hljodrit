import fetch from 'isomorphic-fetch';
import { toastr } from 'react-redux-toastr';

export function getPersonsByCriteria(pageSize, pageNumber, searchQuery) {
    return (dispatch) => {
        dispatch(isFetchingPersons());
        return fetch(`/api/persons?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchQuery}`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingPersons());
            }
        }).then((data) => {
            dispatch(getPersonsByCriteriaSuccess(data));
            dispatch(hasStoppedFetchingPersons());
        });
    };
}

export function resetRegisterUser() {
    return {
        type: 'RESET_REGISTER_PERSON',
        payload: {}
    };
};

export function registerPerson(person) {
    return (dispatch) => {
        dispatch(isRegisteringPerson());
        return fetch('/api/persons', {
            method: 'POST',
            body: JSON.stringify(person),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            if (resp.ok) {
                toastr.success('Tókst', 'Það tókst að nýskrá aðila.');
                return resp.json();
            } else {
                resp.json().then((err) => {
                    toastr.error('Villa', err.message);
                });
                dispatch(hasStoppedRegisteringPerson());
            }
        }).then((data) => {
            dispatch(hasStoppedRegisteringPerson());
            dispatch(registerPersonSuccess(data));
        });
    }
}

function registerPersonSuccess(data) {
    return {
        type: 'REGISTER_PERSON',
        payload: data
    };
};

function isRegisteringPerson() {
    return {
        type: 'IS_REGISTERING_PERSON',
        payload: {}
    };
};

function hasStoppedRegisteringPerson() {
    return {
        type: 'HAS_STOPPED_REGISTERING_PERSON',
        payload: {}
    };
};

export function getPersonRoles() {
    return (dispatch) => {
        return fetch('/api/persons/roles', {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        }).then((data) => {
            dispatch(getPersonRolesSuccess(data));
        });
    }
}

function getPersonsByCriteriaSuccess(data) {
    return {
        type: 'GET_PERSONS_BY_CRITERIA',
        payload: data
    };
};

function getPersonRolesSuccess(data) {
    return {
        type: 'GET_PERSONS_ROLES',
        payload: data
    };
};

function isFetchingPersons() {
    return {
        type: 'IS_FETCHING_PERSONS',
        payload: {}
    };
};

function hasStoppedFetchingPersons() {
    return {
        type: 'HAS_STOPPED_FETCHING_PERSONS',
        payload: {}
    };
};