import fetch from 'isomorphic-fetch';

export function getPersonsByCriteria(pageSize, pageNumber, searchQuery) {
    return (dispatch) => {
        dispatch(isFetchingPersons());
        return fetch(`api/persons?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchQuery}`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingPersons());
            }
        }).then((data) => {
            dispatch(hasStoppedFetchingPersons());
            dispatch(getPersonsByCriteriaSuccess(data));
        });
    };
}

function getPersonsByCriteriaSuccess(data) {
    return {
        type: 'GET_PERSONS_BY_CRITERIA',
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