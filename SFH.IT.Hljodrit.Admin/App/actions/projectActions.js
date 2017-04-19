import fetch from 'isomorphic-fetch';
import * as actionType from './actionTypes';
import { toastr } from 'react-redux-toastr';

export function getAllProjects(pageSize, pageNumber, filters, searchString) {
    return (dispatch) => {
        dispatch(isFetchingProjects());
        return fetch(`/api/projects?pageSize=${pageSize}&pageNumber=${pageNumber}&pending=${filters.pending}&resent=${filters.resent}&approved=${filters.approved}&query=${searchString}`, {
            method: 'GET'
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
            method: 'GET'
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

export function getTracksOnProjectById(projectId) {
    return dispatch => {
        dispatch(clearProjectTracks());
        dispatch(isFetchingSingleProjectTracks());
        return fetch(`/api/projects/${projectId}/tracks`, {
            method: 'GET'
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
            method: 'DELETE'
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

export function updateProjectBasicInfo(basicInfo) {
    return {
        type: 'UPDATE_PROJECT_BASIC_INFO',
        payload: basicInfo
    };
};

export function updateProjectSongs(songs) {
    return {
        type: 'UPDATE_PROJECT_SONGS',
        payload: songs
    };
};

export function updateProjectPerformers(performers) {
    return {
        type: 'UPDATE_PROJECT_PERFORMERS',
        payload: performers
    };
};

export function updateProjectProducers(producers) {
    return {
        type: 'UPDATE_PROJECT_PRODUCERS',
        payload: producers
    };
};

export function createProject(project) {
    return {
        type: 'CREATE_PROJECT',
        payload: project
    };
};

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

function clearProjectTracks() {
    return {
        type: actionType.CLEAR_TRACKS_ON_PROJECT,
        payload: {}
    };
};