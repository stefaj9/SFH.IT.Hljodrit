import fetch from 'isomorphic-fetch';
import * as actionType from './actionTypes';

export function getSongsByCriteria(pageSize, pageNumber, searchString, searchType) {
    return (dispatch) => {
        dispatch(isFetchingSongs());
        dispatch(clearSongList());
        return fetch(`/api/songs?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchString}`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingSongs());
            }
        }).then((data) => {
            dispatch(getSongsbyCriteriaSuccess(data));
            dispatch(hasStoppedFetchingSongs());
        });
    };
};

function getSongsbyCriteriaSuccess(data) {
    return {
        type: actionType.GET_SONGS,
        payload: data
    };
};

function isFetchingSongs() {
    return {
        type: actionType.IS_FETCHING_SONGS,
        payload: {}
    };
};

function hasStoppedFetchingSongs() {
    return {
        type: actionType.HAS_STOPPED_FETCHING_SONGS,
        payload: {}
    };
};

function clearSongList() {
    return {
        type: actionType.CLEAR_SONGS,
        payload: {}
    };
};