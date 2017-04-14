import fetch from 'isomorphic-fetch';
import * as actionType from './actionTypes';
import { toastr } from 'react-redux-toastr';

export function updateSongDetailsById(songId, song) {
    return (dispatch) => {
        dispatch(isFetchingSongs());
        return fetch(`/api/songs/${songId}`, {
            method: 'PUT',
            body: JSON.stringify(song),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að breyta upplýsingum um lag.');
                dispatch(hasStoppedFetchingSongs());
                return resp.json();
            } else {
                toastr.error('Villa!', 'Ekki tókst að breyta upplýsingum um lag.');
                dispatch(hasStoppedFetchingSongs());
            }
        }).then((data) => {
            dispatch(updateSongDetailsByIdSuccess(data));
        });
    }
}

function updateSongDetailsByIdSuccess(updatedSong) {
    return {
        type: actionType.UPDATE_SONG_BY_ID,
        payload: updatedSong
    };
};

export function getSongDetailsById(songId) {
    return (dispatch) => {
        dispatch(isFetchingSongs());
        dispatch(clearSongSelection());
        dispatch(clearMusiciansOnSong());
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

export function addMusicianToSong(albumId, songId, musician) {
    return (dispatch) => {
        dispatch(isFetchingSongs());
        return fetch(`/api/albums/${albumId}/songs/${songId}/musicians`, {
            method: 'POST',
            body: JSON.stringify(musician),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að bæta við flytjanda á lagið.');
                dispatch(getAllMusiciansOnSong(albumId, songId));
            } else {
                toastr.error('Villa!', 'Ekki tókst að bæta við flytjanda á lagið.');
                dispatch(hasStoppedFetchingSongs());
            }
        });
    }
}

export function removeMusiciansFromSong(albumId, songId, musicianIds) {
    return (dispatch) => {
        dispatch(isFetchingSongs());
        return fetch(`/api/albums/${albumId}/songs/${songId}/musicians`, {
            method: 'DELETE',
            body: JSON.stringify(musicianIds),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að eyða völdum flytjendum af lagi.');
                dispatch(getAllMusiciansOnSong(albumId, songId));
            } else {
                toastr.error('Villa!', 'Ekki tókst að eyða völdum flytjendum af lagi.');
                dispatch(hasStoppedFetchingSongs());
            }
        });
    }
}

export function getAllMusiciansOnSong(albumId, songId) {
    return (dispatch) => {
        dispatch(isFetchingSongs());
        return fetch(`/api/albums/${albumId}/songs/${songId}/musicians`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingSongs());
            }
        }).then((data) => {
            dispatch(getAllMusiciansOnSongSuccess(data));
            dispatch(hasStoppedFetchingSongs());
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

function clearMusiciansOnSong() {
    return {
        type: actionType.CLEAR_MUSICIANS_ON_SONG,
        payload: {}
    };
};