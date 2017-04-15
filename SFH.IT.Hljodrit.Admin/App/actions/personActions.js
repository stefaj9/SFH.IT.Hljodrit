import fetch from 'isomorphic-fetch';
import * as actionType from './actionTypes';

export function getPersonById(personId) {
    return (dispatch) => {
        dispatch(clearSelectedPerson());
        dispatch(isFetchingPerson());
        return fetch(`/api/persons/${personId}`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingPerson());
            }
        }).then((data) => {
            dispatch(getPersonByIdSuccess(data));
            dispatch(hasStoppedFetchingPerson());
        });
    }
}

function getPersonByIdSuccess(person) {
    return {
        type: actionType.GET_PERSON_BY_ID,
        payload: person
    };
};

export function getPersonsByCriteria(pageSize, pageNumber, searchQuery, isFetchingList, hasStoppedFetchingList) {
    return (dispatch) => {
        dispatch(isFetchingList());
        return fetch(`/api/persons?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchQuery}`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingList());
            }
        }).then((data) => {
            dispatch(getPersonsByCriteriaSuccess(data));
            dispatch(hasStoppedFetchingList());
        });
    };
}

function getPersonsByCriteriaSuccess(data) {
    return {
        type: actionType.GET_PERSONS_BY_CRITERIA,
        payload: data
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

function getPersonRolesSuccess(data) {
    return {
        type: actionType.GET_PERSONS_ROLES,
        payload: data
    };
};

function isFetchingPerson() {
    return {
        type: actionType.IS_FETCHING_PERSON,
        payload: {}
    };
};

function hasStoppedFetchingPerson() {
    return {
        type: actionType.HAS_STOPPED_FETCHING_PERSON,
        payload: {}
    };
};

function clearSelectedPerson() {
    return {
        type: actionType.CLEAR_SELECTED_PERSON,
        payload: {}
    };
};