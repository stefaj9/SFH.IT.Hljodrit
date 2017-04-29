import fetch from 'isomorphic-fetch';
import * as actionType from './actionTypes';
import { toastr } from 'react-redux-toastr';

export function getPublishersByCriteria(pageSize, pageNumber, searchQuery, isFetchingList, hasStoppedFetchingList) {
    return (dispatch) => {
        dispatch(isFetchingList());
        return fetch(`/api/organizations?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('bt')
            }
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
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('bt')
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        }).then((data) => {
            dispatch(getPublisherIsrcSeriesByIdSuccess(data));
        });
    }
}

function getPublisherIsrcSeriesByIdSuccess(isrcSeries) {
    return {
        type: actionType.GET_PUBLISHER_ISRC_SERIES_BY_ID,
        payload: isrcSeries
    };
};

export function getLabelsByPublisherId(publisherId) {
    return (dispatch) => {
        return fetch(`/api/organizations/${publisherId}/labels`, {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('bt')
            }
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

export function addLabelToOrganizationById(organizationId, label) {
    return (dispatch) => {
        dispatch(isCreatingLabel());
        return fetch(`/api/organizations/${organizationId}/labels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('bt')
            },
            body: JSON.stringify(label)
        }).then(resp => {
            dispatch(hasStoppedCreatingLabel());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að bæta við label á útgefanda.');
                return resp.json();
            } else {
                toastr.error('Villa!', 'Ekki tókst að bæta við label á útgefanda.');
            }
        }).then(data => {
            dispatch(addLabelToOrganizationByIdSuccess(data));
        });
    }
}

function addLabelToOrganizationByIdSuccess(label) {
    return {
        type: actionType.ADD_LABEL_TO_PUBLISHER_BY_ID,
        payload: label
    };
};

function isCreatingLabel() {
    return {
        type: actionType.IS_CREATING_LABEL,
        payload: {}
    };
};

function hasStoppedCreatingLabel() {
    return {
        type: actionType.HAS_STOPPED_CREATING_LABEL,
        payload: {}
    };
};