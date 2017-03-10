import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';

export function getAllExceptions(pageSize, pageNumber) {
    return (dispatch) => {
        dispatch(isFetchingExceptions());
        return fetch(`/api/exceptions?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingExceptions());
            }
        }).then((data) => {
            dispatch(getAllExceptionsSuccess(data));
            dispatch(hasStoppedFetchingExceptions());
        });
    };
}

function getAllExceptionsSuccess(data) {
    return {
        type: types.GET_EXCEPTIONS,
        payload: data
    };
}

function isFetchingExceptions() {
    return {
        type: types.IS_FETCHING_EXCEPTIONS,
        payload: {}
    };
}

function hasStoppedFetchingExceptions() {
    return {
        type: types.HAS_STOPPED_FETCHING_EXCEPTIONS,
        payload: {}
    };
}