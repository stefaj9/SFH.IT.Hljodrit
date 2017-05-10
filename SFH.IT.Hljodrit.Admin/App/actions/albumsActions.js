import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';

export function getAllAlbums(pageSize, pageNumber, searchString, searchType) {
    if(isNaN(searchString) && searchType === 'releaseYear') {
        searchString = '';
    }

    return (dispatch) => {
        dispatch(isFetchingAlbums());
        return fetch(`/api/albums?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchString}&searchFilter=${searchType}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingAlbums());
            }
        }).then((data) => {
            dispatch(getAllAlbumsSuccess(data));
            dispatch(hasStoppedFetchingAlbums());
        });
    };
}

export function getSongsByAlbumId(albumId) {
    return (dispatch) => {
        dispatch(clearCurrentAlbum());
        dispatch(isFetchingSongsByAlbumId());
        return fetch(`/api/albums/${albumId}/songs`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingSongsOnAlbum());
            }
        }).then((data) => {
            dispatch(getSongsByAlbumIdSuccess(data));
            dispatch(hasStoppedFetchingSongsOnAlbum());
        });
    };
}

export function removeSongsFromAlbum(albumId, songIds) {
    return (dispatch) => {
        dispatch(isFetchingSongsByAlbumId());
        return fetch(`/api/albums/${albumId}/songs`, {
            method: 'DELETE',
            body: JSON.stringify(songIds),
            headers: {
                'Authorization': localStorage.getItem('bt-admin'),
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            dispatch(hasStoppedFetchingSongsOnAlbum());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að eyða völdum lögum af plötunni.');
                dispatch(removeSongsFromAlbumSuccess(songIds));
            } else {
                toastr.error('Villa!', 'Ekki tókst að eyða völdum lögum af plötunni.');
            }
        });
    }
}

function removeSongsFromAlbumSuccess(songIds) {
    return {
        type: types.REMOVE_SONGS_FROM_ALBUM,
        payload: songIds
    };
};

export function getAlbumById(albumId) {
    return (dispatch) => {
        dispatch(isFetchingAlbumById());
        return fetch(`/api/albums/${albumId}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingAlbums());
            }
        }).then((data) => {
            dispatch(getAlbumByIdSuccess(data));
            dispatch(hasStoppedFetchingAlbums());
        });
    };
}

export function updateAlbumBasicInfo(basicInfo) {
    return {
        type: types.UPDATE_ALBUM_BASIC_INFO,
        payload: basicInfo
    };
};

export function updateAlbumSongs(songs) {
    return {
        type: types.UPDATE_ALBUM_SONGS,
        payload: songs
    };
};

export function updateAlbumPerformers(performers) {
    return {
        type: types.UPDATE_ALBUM_PERFORMERS,
        payload: performers
    };
};

export function updateAlbumProducers(producers) {
    return {
        type: types.UPDATE_ALBUM_PRODUCERS,
        payload: producers
    };
};

export function createAlbum(album) {
    return (dispatch) => {
        dispatch(isCreatingAlbum());
        return fetch('/api/albums', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('bt-admin')
            },
            body: JSON.stringify(album)
        }).then(resp => {
            dispatch(hasStoppedCreatingAlbum());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að búa til nýja plötu.');
                return resp.json();
            } else {
                toastr.error('Villa!', 'Ekki tókst að búa til nýja plötu.');
            }
        }).then(data => {
            if (data) {
                browserHistory.push(`/albums/${data}`);
            }
            dispatch(createAlbumSuccess());
        });
    }
};

function createAlbumSuccess() {
    return {
        type: types.CREATE_ALBUM,
        payload: {}
    };
};

function isCreatingAlbum() {
    return {
        type: types.IS_CREATING_ALBUM,
        payload: {}
    };
};

function hasStoppedCreatingAlbum() {
    return {
        type: types.HAS_STOPPED_CREATING_ALBUM,
        payload: {}
    };
};

function clearCurrentAlbum() {
    return {
        type: types.CLEAR_CURRENT_ALBUM,
        payload: []
    };
}

function getAllAlbumsSuccess(data) {
    return {
        type: types.GET_ALBUMS,
        payload: data
    };
}

function isFetchingAlbums() {
    return {
        type: types.IS_FETCHING_ALBUMS,
        payload: {}
    };
}

function getAlbumByIdSuccess(data) {
    return {
        type: types.GET_ALBUM_BY_ID,
        payload: data
    };
}

function isFetchingAlbumById() {
    return {
        type: types.IS_FETCHING_ALBUM_BY_ID,
        payload: {}
    };
}

function isFetchingSongsByAlbumId() {
    return {
        type: types.IS_FETCHING_SONGS_BY_ALBUM_ID,
        payload: {}
    };
}

function hasStoppedFetchingSongsOnAlbum() {
    return {
        type: types.HAS_STOPPED_FETCHING_SONGS_ON_ALBUM,
        payload: {}
    };
}

function getSongsByAlbumIdSuccess(data) {
    return {
        type: types.GET_SONGS_BY_ALBUM_ID,
        payload: data
    };
}

function hasStoppedFetchingAlbums() {
    return {
        type: types.HAS_STOPPED_FETCHING_ALBUMS,
        payload: {}
    };
}
