import fetch from 'isomorphic-fetch';

export function getPublishersByCriteria(pageSize, pageNumber, searchQuery) {
    return (dispatch) => {
        return fetch(`/api/organizations?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchQuery}`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        }).then((data) => {
            dispatch(getAllPublishersSuccess(data));
        });
    }
}

function getAllPublishersSuccess(data) {
    return {
        type: 'GET_ALL_PUBLISHERS',
        payload: data
    };
};

export function getPublisherLabelsById(publisherId) {
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
        type: 'GET_PUBLISHER_LABELS',
        payload: labels
    };
};