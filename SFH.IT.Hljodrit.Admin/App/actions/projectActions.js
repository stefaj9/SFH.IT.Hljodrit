import fetch from 'isomorphic-fetch';

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

export function selectProjectWithActionById(id, action) {
    let selectedProject = {
        id: id,
        action: action
    };

    return {
        type: 'SELECT_PROJECT_WITH_ACTION',
        payload: selectedProject
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