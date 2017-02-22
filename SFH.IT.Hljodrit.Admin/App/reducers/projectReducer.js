let initialState = {
    selectedProject: {
        basicInfo: {},
        songs: [],
        performers: [],
        producers: []
    },
    projectEnvelope: {
        projects: [],
        currentPage: -1,
        maximumPage: -1
    },
    isFetchingProjects: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_PROJECTS': return Object.assign({}, state, {
            projectEnvelope: action.payload
        });
        case 'SELECT_PROJECT_WITH_ACTION': return Object.assign({}, state, {
            selectedProject: action.payload
        });
        case 'IS_FETCHING_PROJECTS': return Object.assign({}, state, {
            isFetchingProjects: true
        });
        case 'HAS_STOPPED_FETCHING_PROJECTS': return Object.assign({}, state, {
            isFetchingProjects: false
        });
        case 'UPDATE_PROJECT_BASIC_INFO': return Object.assign({}, state, {
            selectedProject: {
                basicInfo: action.payload
            }
        });
        case 'UPDATE_PROJECT_SONGS': return Object.assign({}, state, {
            selectedProject: {
                songs: action.payload
            }
        });
        case 'UPDATE_PROJECT_PERFORMERS': return Object.assign({}, state, {
            selectedProject: {
                performers: action.payload
            }
        });
        case 'UPDATE_PROJECT_PRODUCERS': return Object.assign({}, state, {
            selectedProject: {
                producers: action.payload
            }
        });
        case 'CREATE_PROJECT': return Object.assign({}, state, {

        });
        default: return state;
    }
}