import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import * as actionType from './actionTypes';
import { toastr } from 'react-redux-toastr';

export function getPersonById(personId) {
    return (dispatch) => {
        dispatch(clearSelectedPerson());
        dispatch(isFetchingPerson());
        return fetch(`/api/persons/${personId}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingPerson());
            }
        }).then((data) => {
            dispatch(getPersonByIdSuccess(data));
            dispatch(hasStoppedFetchingPerson());
        });
    }
}

function getPersonByIdSuccess(person) {
    return {
        type: actionType.GET_PERSON_BY_ID,
        payload: person
    };
};

export function updatePersonById(personId, person) {
    return (dispatch) => {
        dispatch(isFetchingPerson());
        return fetch(`/api/persons/${personId}`, {
            method: 'PUT',
            body: JSON.stringify(person),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then((resp) => {
            if (resp.ok) {
                dispatch(hasStoppedFetchingPerson());
                toastr.success('Tókst!', 'Það tókst að uppfæra aðila.');
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingPerson());
                toastr.error('Villa!', 'Ekki tókst að uppfæra aðila.');
            }
        }).then((data) => {
            dispatch(updatePersonByIdSuccess(data));
        });
    }
}

function updatePersonByIdSuccess(person) {
    return {
        type: actionType.UPDATE_PERSON_BY_ID,
        payload: person
    };
};

export function deletePersonById(personId) {
    return (dispatch) => {
        dispatch(isFetchingPerson());
        return fetch(`/api/persons/${personId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then(resp => {
            dispatch(hasStoppedFetchingPerson());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að eyða aðila.');
                browserHistory.push('/app/musicians');
            } else {
                toastr.error('Villa!', 'Ekki tókst að eyða aðila.');
            }
        });
    }
}

export function getPersonsByCriteria(pageSize, pageNumber, searchQuery, isFetchingList, hasStoppedFetchingList) {
    return (dispatch) => {
        dispatch(isFetchingList());
        return fetch(`/api/persons?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingList());
            }
        }).then((data) => {
            dispatch(getPersonsByCriteriaSuccess(data));
            dispatch(hasStoppedFetchingList());
        });
    };
}

function getPersonsByCriteriaSuccess(data) {
    return {
        type: actionType.GET_PERSONS_BY_CRITERIA,
        payload: data
    };
};

export function getMediaAssociatedWithPerson(personId) {
    return (dispatch) => {
        dispatch(isFetchingPersonMedia());
        return fetch(`/api/persons/${personId}/medias`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then((resp) => {
            if (resp.ok) {
                dispatch(hasStoppedFetchingPersonMedia());
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingPersonMedia());
            }
        }).then((data) => {
            dispatch(getMediaAssociatedWithPersonSuccess(data));
        });
    }
}

function getMediaAssociatedWithPersonSuccess(media) {
    return {
        type: actionType.GET_MEDIA_ASSOCIATED_WITH_PERSON,
        payload: media
    };
};

export function getAlbumsAssociatedWithPerson(personId) {
    return (dispatch) => {
        dispatch(isFetchingPersonAlbums());
        return fetch(`/api/persons/${personId}/albums`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then(resp => {
            dispatch(hasStoppedFetchingPersonAlbums());
            if (resp.ok) {
                return resp.json();
            }
        }).then(data => {
            dispatch(getAlbumsAssociatedWithPersonSuccess(data));
        })
    }
}

function getAlbumsAssociatedWithPersonSuccess(albums) {
    return {
        type: actionType.GET_ALBUMS_ASSOCIATED_WITH_PERSON,
        payload: albums
    };
};

export function getPersonRoles() {
    return (dispatch) => {
        return fetch('/api/persons/roles', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        }).then((data) => {
            dispatch(getPersonRolesSuccess(data));
        });
    }
}

function getPersonRolesSuccess(data) {
    return {
        type: actionType.GET_PERSONS_ROLES,
        payload: data
    };
};

function isFetchingPerson() {
    return {
        type: actionType.IS_FETCHING_PERSON,
        payload: {}
    };
};

function hasStoppedFetchingPerson() {
    return {
        type: actionType.HAS_STOPPED_FETCHING_PERSON,
        payload: {}
    };
};

function isFetchingPersonMedia() {
    return {
        type: actionType.IS_FETCHING_PERSON_MEDIA,
        payload: {}
    };
};

function hasStoppedFetchingPersonMedia() {
    return {
        type: actionType.HAS_STOPPED_FETCHING_PERSON_MEDIA,
        payload: {}
    };
};

function isFetchingPersonAlbums() {
    return {
        type: actionType.IS_FETCHING_PERSON_ALBUMS,
        payload: {}
    };
};

function hasStoppedFetchingPersonAlbums() {
    return {
        type: actionType.HAS_STOPPED_FETCHING_PERSON_ALBUMS,
        payload: {}
    };
};

function clearSelectedPerson() {
    return {
        type: actionType.CLEAR_SELECTED_PERSON,
        payload: {}
    };
};