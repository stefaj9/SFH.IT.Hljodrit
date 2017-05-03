import * as types from './actionTypes';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

export function getProjectById(projectId) {
    return dispatch => {
        dispatch(isFetchingProjectById());
        return fetch(`/api/projects/${projectId}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt')
            }
        }).then(resp => {
            dispatch(hasStoppedFetchingProjectById());
            if (resp.ok) {
                return resp.json();
            } else {
                browserHistory.push('/app/projects');
                toastr.error('Villa!', 'Ekki tókst að sækja verkefni.');
            }
        }).then(project => {
            dispatch(getProjectByIdSuccess(project));
        });
    };
};

function getProjectByIdSuccess(project) {
    return {
        type: types.GET_PROJECT_BY_ID,
        payload: project
    };
};

export function getProjectTracksById(projectId) {
    return dispatch => {
        dispatch(isFetchingProjectById());
        return fetch(`/api/projects/${projectId}/tracks`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt')
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            }
        }).then(tracks => {
            dispatch(getProjectTracksByIdSuccess(tracks));
        });
    }
};

function getProjectTracksByIdSuccess(tracks) {
    return {
        type: types.GET_PROJECT_TRACKS_BY_ID,
        payload: tracks
    };
};

export function addTrackToProject(projectId, track) {
    return dispatch => {
        dispatch(isFetchingProjectById());
        return fetch(`/api/projects/${projectId}/tracks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('bt')
            },
            body: JSON.stringify(track)
        }).then(resp => {
            dispatch(hasStoppedFetchingProjectById());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að bæta við lagi.');
                return resp.json();
            } else {
                toastr.error('Villa!', 'Ekki tókst að bæta við lagi.');
            }
        }).then(track => {
            dispatch(addTrackToProjectSuccess(track));
        });
    }
};

function addTrackToProjectSuccess(track) {
    return {
        type: types.ADD_TRACK_TO_PROJECT,
        payload: track
    };
};

export function removeTracksFromProject(projectId, trackIds) {
    return dispatch => {
        dispatch(isFetchingProjectById());
        return fetch(`/api/projects/${projectId}/tracks`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('bt')
            },
            body: JSON.stringify(trackIds)
        }).then(resp => {
            dispatch(hasStoppedFetchingProjectById());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að eyða völdum lögum.');
                dispatch(removeTracksFromProjectSuccess(trackIds));
            } else {
                toastr.error('Villa!', 'Ekki tókst að eyða völdum lögum.');
            }
        });
    }
};

function removeTracksFromProjectSuccess(trackIds) {
    return {
        type: types.REMOVE_TRACKS_FROM_PROJECT,
        payload: trackIds
    };
};

export function getProjectsForUser() {
    return dispatch => {
        dispatch(isFetchingUserProjects());
        return fetch('/api/projects/user', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt')
            }
        }).then(resp => {
            dispatch(hasStoppedFetchingUserProjects());
            if (resp.ok) {
                return resp.json();
            }
        }).then(projects => {
            dispatch(getProjectsForUserSuccess(projects));
        });
    };
};

function getProjectsForUserSuccess(projects) {
    return {
        type: types.GET_PROJECT_FOR_USER,
        payload: projects
    };
};

export function updateProjectById(projectId, project) {
    return dispatch => {
        dispatch(clearCurrentProject());
        dispatch(isFetchingProjectById());
        return fetch(`/api/projects/${projectId}`, {
            method: 'PUT',
            headers: {
                'Authorization': localStorage.getItem('bt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(resp => {
            dispatch(hasStoppedFetchingProjectById());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að uppfæra verkefni.');
                return resp.json();
            } else {
                toastr.error('Villa!', 'Ekki tókst að uppfæra verkefni.');
            }
        }).then(data => {
            dispatch(updateProjectByIdSuccess(data));
        });
    }
}

function updateProjectByIdSuccess(project) {
    return {
        type: types.UPDATE_PROJECT_BY_ID,
        payload: project
    };
};

export function getProjectStatus() {
    return dispatch => {
        return fetch('/api/projects/status', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt')
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            }
        }).then(data => {
            dispatch(getProjectStatusSuccess(data));
        });
    }
}

function getProjectStatusSuccess(status) {
    return {
        type: types.GET_PROJECT_STATUS,
        payload: status
    };
};

export function updateProjectBasicInfo(basicInfo) {
    return {
        type: types.UPDATE_PROJECT_BASIC_INFO,
        payload: basicInfo
    };
};

export function updateProjectSongs(songs) {
    return {
        type: types.UPDATE_PROJECT_SONGS,
        payload: songs
    };
};

export function updateProjectPerformers(performers) {
    return {
        type: types.UPDATE_PROJECT_PERFORMERS,
        payload: performers
    };
};

export function updateProjectProducers(producers) {
    return {
        type: types.UPDATE_PROJECT_PRODUCERS,
        payload: producers
    };
};

export function createProject(project) {
    return (dispatch) => {
        dispatch(isCreatingProject());
        return fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('bt')
            },
            body: JSON.stringify(project)
        }).then(resp => {
            dispatch(hasStoppedCreatingProject());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að búa til nýtt verkefni.');
                browserHistory.push('/app/projects');
                dispatch(createProjectSuccess());
            } else {
                toastr.error('Villa!', 'Ekki tókst að búa til nýtt verkefni.');
            }
        });
    }
};

function createProjectSuccess() {
    return {
        type: types.CREATE_PROJECT,
        payload: {}
    };
};

function isCreatingProject() {
    return {
        type: types.IS_CREATING_PROJECT,
        payload: {}
    };
};

function hasStoppedCreatingProject() {
    return {
        type: types.HAS_STOPPED_CREATING_PROJECT,
        payload: {}
    };
};

function isFetchingUserProjects() {
    return {
        type: types.IS_FETCHING_USER_PROJECTS,
        payload: {}
    };
};

function hasStoppedFetchingUserProjects() {
    return {
        type: types.HAS_STOPPED_FETCHING_USER_PROJECTS,
        payload: {}
    };
};

function isFetchingProjectById() {
    return {
        type: types.IS_FETCHING_PROJECT_BY_ID,
        payload: {}
    };
};

function hasStoppedFetchingProjectById() {
    return {
        type: types.HAS_STOPPED_FETCHING_PROJECT_BY_ID,
        payload: {}
    };
};

function clearCurrentProject() {
    return {
        type: types.CLEAR_CURRENT_PROJECT,
        payload: {}
    };
};