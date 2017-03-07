import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';

export function getExceptions(pageSize, pageNumber) {
    return (dispatch) => {
        dispatch(isFetchingExceptions());
        return fetch(`api/exceptions?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingExceptions());
            }
        }).then((data) => {
            dispatch(hasStoppedFetchingExceptions());
            dispatch(getExceptionsSuccess(data));
        });
    };
}

function getExceptionsSuccess(data) {
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