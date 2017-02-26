import fetch from 'isomorphic-fetch';

export function getAllProjects(pageSize, pageNumber, filters) {
    return (dispatch) => {
        return fetch(`/api/projects?pageSize=${pageSize}&pageNumber=${pageNumber}&pending=${filters.pending}&resent=${filters.resent}&approved=${filters.approved}`, {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        }).then((data) => {
            dispatch(getAllProjectsSuccess(data));
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