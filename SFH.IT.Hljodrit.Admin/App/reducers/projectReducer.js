import _ from 'lodash';

let initialState = {
    selectedProject: {
        basicInfo: {},
        songs: [],
        producers: []
    },
    instrumentSuggestions: [],
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
        case 'GET_INSTRUMENT_SUGGESTIONS':
            let instrumentSuggestions = _.map(action.payload, 'instrumentNameIcelandic');
            return Object.assign({}, state, {
                instrumentSuggestions: instrumentSuggestions
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
                basicInfo: action.payload,
                songs: state.selectedProject.songs,
                producers: state.selectedProject.producers
            }
        });
        case 'UPDATE_PROJECT_SONGS': 
            return Object.assign({}, state, {
                selectedProject: {
                    basicInfo: state.selectedProject.basicInfo,
                    songs: action.payload,
                    producers: state.selectedProject.producers
                }
            });
        case 'UPDATE_PROJECT_PERFORMERS': 
            let newSongs = _.cloneDeep(state.selectedProject.songs);
            _.forEach(action.payload, (performers) => {
                let song = _.find(newSongs, (s) => {
                    return s.number === performers.number;
                });
                song.performers = performers.performers;
            });
            return Object.assign({}, state, {
                selectedProject: {
                    basicInfo: state.selectedProject.basicInfo,
                    songs: newSongs,
                    producers: state.selectedProject.producers
                }
            });
        case 'UPDATE_PROJECT_PRODUCERS': return Object.assign({}, state, {
            selectedProject: {
                basicInfo: state.selectedProject.basicInfo,
                songs: state.selectedProject.songs,
                producers: action.payload
            }
        });
        case 'CREATE_PROJECT': return Object.assign({}, state, {

        });
        default: return state;
    }
}