import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';

export function getAllAlbums(pageSize, pageNumber, searchString, searchType) {
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

export function selectAlbum(album) {
    return {
        type: types.SELECT_ALBUM,
        payload: album
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

function hasStoppedFetchingAlbums() {
    return {
        type: types.HAS_STOPPED_FETCHING_ALBUMS,
        payload: {}
    };
}
