import fetch from 'isomorphic-fetch';
import * as actionType from './actionTypes';

export function getPublishersByCriteria(pageSize, pageNumber, searchQuery, isFetchingList, hasStoppedFetchingList) {
    return (dispatch) => {
        dispatch(isFetchingList());
        return fetch(`/api/organizations?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchQuery}`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingList());
            }
        }).then((data) => {
            dispatch(getAllPublishersSuccess(data));
            dispatch(hasStoppedFetchingList());
        });
    }
}

function getAllPublishersSuccess(data) {
    return {
        type: actionType.GET_ALL_PUBLISHERS,
        payload: data
    };
};

export function getPublisherIsrcSeriesById(publisherId) {
    return (dispatch) => {
        return fetch(`/api/organizations/${publisherId}/isrc-series`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        }).then((data) => {
            dispatch(getPublisherIsrcSeriesByIdSuccess(data));
        });
    }
}


export function getLabelsByPublisherId(publisherId) {
    return (dispatch) => {
        return fetch(`/api/organizations/${publisherId}/labels`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        }).then((data) => {
            dispatch(getPublisherLabelsByIdSuccess(data));
        });
    }
}

function getPublisherLabelsByIdSuccess(labels) {
    return {
        type: actionType.GET_PUBLISHER_LABELS_BY_ID,
        payload: labels
    };
};

function getPublisherIsrcSeriesByIdSuccess(isrcSeries) {
    return {
        type: actionType.GET_PUBLISHER_ISRC_SERIES_BY_ID,
        payload: isrcSeries
    };
};
