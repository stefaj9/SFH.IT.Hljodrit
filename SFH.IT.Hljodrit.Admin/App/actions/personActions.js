import fetch from 'isomorphic-fetch';
import { isFetchingList, hasStoppedFetchingList } from './flowActions';

export function getPersonsByCriteria(pageSize, pageNumber, searchQuery) {
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