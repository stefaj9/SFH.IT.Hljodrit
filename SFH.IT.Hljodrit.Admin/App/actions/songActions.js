import fetch from 'isomorphic-fetch';
import * as actionType from './actionTypes';

export function getSongDetailsById(songId) {
    return (dispatch) => {
        dispatch(isFetchingSongs());
        dispatch(clearSongSelection());
        return fetch(`/api/songs/${songId}`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingSongs());
            }
        }).then((song) => {
            dispatch(getSongDetailsByIdSuccess(song));
            dispatch(hasStoppedFetchingSongs());
        });
    }
}

function getSongDetailsByIdSuccess(song) {
    return {
        type: actionType.GET_SONG_BY_ID,
        payload: song
    };
};

export function getAllMusiciansOnSong(albumId, songId) {
    return (dispatch) => {
        return fetch(`/api/albums/${albumId}/songs/${songId}/musicians`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        }).then((data) => {
            dispatch(getAllMusiciansOnSongSuccess(data));
        });
    }
}

function getAllMusiciansOnSongSuccess(musicians) {
    return {
        type: actionType.GET_ALL_MUSICIANS_ON_SONG,
        payload: musicians
    };
};

export function getSongsByCriteria(pageSize, pageNumber, searchString, searchType) {
    return (dispatch) => {
        dispatch(isFetchingSongs());
        dispatch(clearSongList());
        return fetch(`/api/songs?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchString}&searchType=${searchType}`, {
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

export function getMediaRecordingsByCriteria(pageSize, pageNumber, searchString, searchType) {
    return (dispatch) => {
        dispatch(isFetchingSongs());
        dispatch(clearMediaRecordingList());
        return fetch(`/api/media?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchString}&searchType=${searchType}`, {
            method: 'GET'
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

function clearMediaRecordingList() {
    return {
        type: actionType.CLEAR_MEDIA,
        payload: {}
    };
};

function clearSongSelection() {
    return {
        type: actionType.CLEAR_SONG_SELECTION,
        payload: {}
    };
};