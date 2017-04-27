import * as types from './actionTypes';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

export function getProjectStatus() {
    return dispatch => {
        return fetch('/api/projects/status', {
            method: 'GET'
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(resp => {
            dispatch(hasStoppedCreatingProject());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að búa til nýtt verkefni.');
                return resp.json();
            } else {
                toastr.error('Villa!', 'Ekki tókst að búa til nýtt verkefni.');
            }
        }).then(data => {
            if (data) {
                browserHistory.push(`/projects/${data}`);
            }
            dispatch(createProjectSuccess());
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