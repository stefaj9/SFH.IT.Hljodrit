import fetch from 'isomorphic-fetch';
import * as actionType from './actionTypes';
import { toastr } from 'react-redux-toastr';

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

export function getPublisherById(publisherId, isFetchingList, hasStoppedFetchingList) {
    return (dispatch) => {
        dispatch(clearCurrentPublisher());
        dispatch(isFetchingList());
        return fetch(`/api/organizations/${publisherId}`, {
            method: 'GET'
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingList());
            }
        }).then(data => {
            dispatch(getPublisherByIdSuccess(data));
            dispatch(hasStoppedFetchingList());
        });
    }
}

export function createPublisher(publisher) {
    return (dispatch) => {
        dispatch(isCreatingPublisher());
        console.log('I will be creating');
        console.log(publisher);
        return fetch('/api/organizations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(publisher)
        }).then(resp => {
            dispatch(hasStoppedCreatingPublisher());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að búa til nýjan framleiðanda.');
                return resp.json();
            } else {
                toastr.error('Villa!', 'Ekki tókst að búa til nýjan framleiðanda.');
            }
        }).then(data => {
            if (data) {
                browserHistory.push(`/organizations/${data.id}`);
            }
            dispatch(createPublisherSuccess());
        });
    }
}

function createPublisherSuccess() {
    return {
        type: actionType.CREATE_PUBLISHER,
        payload: {}
    }
}

function isCreatingPublisher() {
    return {
        type: actionType.IS_CREATING_PUBLISHER,
        payload: {}
    }
}

function hasStoppedCreatingPublisher() {
    return {
        type: actionType.HAS_STOPPED_CREATING_PUBLISHER,
        payload: {}
    }
}

function clearCurrentPublisher() {
    return {
        type: actionType.CLEAR_CURRENT_PUBLISHER,
        payload: {}
    };
}

function getPublisherByIdSuccess(data) {
    return {
        type: actionType.GET_PUBLISHER_BY_ID,
        payload: data
    }
}

function getAllPublishersSuccess(data) {
    return {
        type: actionType.GET_ALL_PUBLISHERS,
        payload: data
    };
}

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

function getPublisherIsrcSeriesByIdSuccess(isrcSeries) {
    return {
        type: actionType.GET_PUBLISHER_ISRC_SERIES_BY_ID,
        payload: isrcSeries
    };
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
}

export function addLabelToOrganizationById(organizationId, label) {
    return (dispatch) => {
        dispatch(isCreatingLabel());
        return fetch(`/api/organizations/${organizationId}/labels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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

export function addIsrcSeriesToOrganizationById(organizationId, isrcRegistrant) {
    return (dispatch) => {
        dispatch(isCreatingIsrc());
        return fetch(`/api/organizations/${organizationId}/isrc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(isrcRegistrant)
        }).then(resp => {
            dispatch(hasStoppedCreatingIsrc());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að bæta við ISRC á útgefanda.');
                return resp.json();
            } else {
                toastr.error('Villa!', 'Ekki tókst að bæta við ISRC á útgefanda.');
            }
        }).then(data => {
            dispatch(addIsrcToOrganizationByIdSuccess(data));
        });
    }
}

function addIsrcToOrganizationByIdSuccess(isrc) {
    return {
        type: actionType.ADD_ISRC_TO_PUBLISHER_BY_ID,
        payload: isrc
    }
}

function addLabelToOrganizationByIdSuccess(label) {
    return {
        type: actionType.ADD_LABEL_TO_PUBLISHER_BY_ID,
        payload: label
    };
}

function isCreatingIsrc() {
    return {
        type: actionType.IS_CREATING_ISRC,
        payload: {}
    };
}

function hasStoppedCreatingIsrc() {
    return {
        type: actionType.HAS_STOPPED_CREATING_ISRC,
        payload: {}
    };
}

function isCreatingLabel() {
    return {
        type: actionType.IS_CREATING_LABEL,
        payload: {}
    };
}

function hasStoppedCreatingLabel() {
    return {
        type: actionType.HAS_STOPPED_CREATING_LABEL,
        payload: {}
    };
}