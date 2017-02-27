let initialState = {
    selectedProject: null,
    projectEnvelope: {
        projects: [],
        currentPage: -1,
        maximumPage: -1
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_PROJECTS': return Object.assign({}, state, {
            projectEnvelope: action.payload
        });
        case 'SELECT_PROJECT_WITH_ACTION': return Object.assign({}, state, {
            selectedProject: action.payload
        });
        default: return state;
    }
}