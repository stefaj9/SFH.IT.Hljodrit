import fetch from 'isomorphic-fetch';

export function getMainArtistsByCriteria(pageSize, pageNumber, searchTerm, isFetchingList, hasStoppedFetchingList) {
    return (dispatch) => {
        dispatch(isFetchingList());
        return fetch(`/api/mainartists?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchTerm}`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingList());
            }
        }).then((data) => {
            dispatch(getMainArtistsByCriteriaSuccess(data));
            dispatch(hasStoppedFetchingList());
        });
    }
}

function getMainArtistsByCriteriaSuccess(data) {
    return {
        type: 'GET_MAIN_ARTISTS',
        payload: data
    };
};