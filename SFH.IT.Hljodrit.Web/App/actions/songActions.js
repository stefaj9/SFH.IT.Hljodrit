import * as actionType from './actionTypes';
import fetch from 'isomorphic-fetch';

export function getMediaRecordingsByCriteria(pageSize, pageNumber, searchString, searchType) {
    return (dispatch) => {
        dispatch(isFetchingSongs());
        dispatch(clearMediaRecordingList());
        return fetch(`/api/media?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchString}&searchType=${searchType}`, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('bt')
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingSongs());
            }
        }).then((data) => {
            dispatch(getMediaRecordingsByCriteriaSuccess(data));
            dispatch(hasStoppedFetchingSongs());
        });
    };
}

function getMediaRecordingsByCriteriaSuccess(data) {
    return {
        type: actionType.GET_MEDIA,
        payload: data
    };
}

function isFetchingSongs() {
    return {
        type: actionType.IS_FETCHING_SONGS,
        payload: {}
    };
}

function hasStoppedFetchingSongs() {
    return {
        type: actionType.HAS_STOPPED_FETCHING_SONGS,
        payload: {}
    };
}

function clearMediaRecordingList() {
    return {
        type: actionType.CLEAR_MEDIA,
        payload: {}
    };
}