import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import * as actionType from './actionTypes';
import { toastr } from 'react-redux-toastr';

export function getAllProjects(pageSize, pageNumber, filters, searchString) {
    return (dispatch) => {
        dispatch(isFetchingProjects());
        return fetch(`/api/projects?pageSize=${pageSize}&pageNumber=${pageNumber}&inWorkingState=${filters.inWorkingStage}&recordingFinished=${filters.recordingFinished}&readyForPublish=${filters.readyForPublish}&published=${filters.published}&query=${searchString}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingProjects());
            }
        }).then((data) => {
            dispatch(getAllProjectsSuccess(data));
            dispatch(hasStoppedFetchingProjects());
        });
    }
}

export function getProjectById(projectId) {
    return dispatch => {
        dispatch(isFetchingSingleProject());
        return fetch(`/api/projects/${projectId}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then(resp => {
            dispatch(hasStoppedFetchingSingleProject());
            if (resp.ok) {
                return resp.json();
            }
        }).then(data => {
            dispatch(getProjectByIdSuccess(data));
        });
    }
}

function getProjectByIdSuccess(project) {
    return {
        type: actionType.GET_PROJECT_BY_ID,
        payload: project
    };
};

export function publishProjectById(projectId, review) {
    return dispatch => {
        dispatch(isPublishingProject());
        return fetch(`/api/projects/${projectId}/publish`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('bt-admin')
            },
            body: JSON.stringify(review)
        }).then(resp => {
            dispatch(hasStoppedPublishingProject());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að samþykkja verkefnið.');
                return resp.json();
            } else {
                toastr.error('Villa!', 'Ekki tókst að samþykkja verkefnið.');
            }
        }).then(data => {
            // Reroute to newly published album
            browserHistory.push(`/app/albums/${data}`);
        });
    }
}

export function getTracksOnProjectById(projectId) {
    return dispatch => {
        dispatch(clearProjectTracks());
        dispatch(isFetchingSingleProjectTracks());
        return fetch(`/api/projects/${projectId}/tracks`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then(resp => {
            dispatch(hasStoppedFetchingSingleProjectTracks());
            if (resp.ok) {
                return resp.json();
            }
        }).then(data => {
            dispatch(getTracksOnProjectByIdSuccess(data));
        });
    }
}

function getTracksOnProjectByIdSuccess(tracks) {
    return {
        type: actionType.GET_TRACKS_ON_PROJECT,
        payload: tracks
    };
};

export function removeProjectById(projectId) {
    return dispatch => {
        dispatch(isFetchingProjects());
        return fetch(`/api/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then(resp => {
            dispatch(hasStoppedFetchingProjects());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að eyða verkefninu.');
                dispatch(removeProjectByIdSuccess(projectId));
            } else {
                toastr.error('Villa!', 'Ekki tókst að eyða verkefninu.');
            }
        });
    }
}

function removeProjectByIdSuccess(projectId) {
    return {
        type: actionType.REMOVE_PROJECT_BY_ID,
        payload: projectId
    };
};

export function sendCommentByProjectId(projectId, commentModel) {
    console.log(commentModel);
    return () => {
        return fetch(`/api/projects/${projectId}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('bt-admin')
            },
            body: JSON.stringify(commentModel)
        }).then(resp => {
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að senda athugasemd.');
            } else {
                toastr.error('Villa!', 'Ekki tókst að senda athugasemd.');
            }
        });
    }
}

function getAllProjectsSuccess(data) {
    return {
        type: 'GET_ALL_PROJECTS',
        payload: data
    };
};

function isFetchingProjects() {
    return {
        type: 'IS_FETCHING_PROJECTS',
        payload: {}
    };
};

function hasStoppedFetchingProjects() {
    return {
        type: 'HAS_STOPPED_FETCHING_PROJECTS',
        payload: {}
    };
};

function isFetchingSingleProject() {
    return {
        type: actionType.IS_FETCHING_SINGLE_PROJECT,
        payload: {}
    };
};

function hasStoppedFetchingSingleProject() {
    return {
        type: actionType.HAS_STOPPED_FETCHING_SINGLE_PROJECT,
        payload: {}
    };
};

function isFetchingSingleProjectTracks() {
    return {
        type: actionType.IS_FETCHING_SINGLE_PROJECT_TRACKS,
        payload: {}
    };
};

function hasStoppedFetchingSingleProjectTracks() {
    return {
        type: actionType.HAS_STOPPED_FETCHING_SINGLE_PROJECT_TRACKS,
        payload: {}
    };
};

function isPublishingProject() {
    return {
        type: actionType.IS_PUBLISHING_PROJECT,
        payload: {}
    };
};

function hasStoppedPublishingProject() {
    return {
        type: actionType.HAS_STOPPED_PUBLISHING_PROJECT,
        payload: {}
    };
};

function clearProjectTracks() {
    return {
        type: actionType.CLEAR_TRACKS_ON_PROJECT,
        payload: {}
    };
};