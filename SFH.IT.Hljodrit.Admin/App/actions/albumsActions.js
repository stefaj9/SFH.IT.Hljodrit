import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';

export function getAllAlbums(pageSize, pageNumber, searchString, searchType) {
    if(isNaN(searchString) && searchType === 'releaseYear') {
        searchString = '';
    }

    return (dispatch) => {
        dispatch(isFetchingAlbums());
        return fetch(`/api/albums?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchString}&searchFilter=${searchType}`, {
            method: 'GET'
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
        dispatch(isFetchingSongsByAlbumId());
        return fetch(`/api/albums/${albumId}/songs`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingAlbums());
            }
        }).then((data) => {
            dispatch(getSongsByAlbumIdSuccess(data));
            dispatch(hasStoppedFetchingAlbums());
        });
    };
}

export function getAlbumById(albumId) {
    return (dispatch) => {
        dispatch(isFetchingAlbumById());
        return fetch(`/api/albums/${albumId}`, {
            method: 'GET'
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
