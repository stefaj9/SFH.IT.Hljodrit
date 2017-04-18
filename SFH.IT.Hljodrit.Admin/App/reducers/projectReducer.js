import _ from 'lodash';
import * as actionType from '../actions/actionTypes';

let initialState = {
    selectedProject: {
        basicInfo: {
            projectMainArtist: {
                id: -1,
                name: ''
            },
            projectCountryOfPublish: {
                code: '',
                name: ''
            },
            projectYearOfPublish: 1337
        },
        songs: [],
        publisher: {}
    },
    reviewProject: {},
    projectEnvelope: {
        objects: [],
        currentPage: -1,
        maximumPage: -1
    },
    isFetchingProjects: true,
    isFetchingSingleProject: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_PROJECTS': return Object.assign({}, state, {
            projectEnvelope: action.payload
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
                publisher: state.selectedProject.publisher
            }
        });
        case 'UPDATE_PROJECT_SONGS': 
            return Object.assign({}, state, {
                selectedProject: {
                    basicInfo: state.selectedProject.basicInfo,
                    songs: action.payload,
                    publisher: state.selectedProject.publisher
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
                    publisher: state.selectedProject.publisher
                }
            });
        case 'UPDATE_PROJECT_PRODUCERS': return Object.assign({}, state, {
            selectedProject: {
                basicInfo: state.selectedProject.basicInfo,
                songs: state.selectedProject.songs,
                publisher: action.payload
            }
        });
        case 'CREATE_PROJECT': return Object.assign({}, state, {

        });
        case actionType.GET_PROJECT_BY_ID: return Object.assign({}, state, {
            reviewProject: action.payload
        });
        case actionType.REMOVE_PROJECT_BY_ID: 
            let projectEnvelope = _.cloneDeep(state.projectEnvelope);
            _.remove(projectEnvelope.objects, (project) => { return project.id === action.payload });
            return Object.assign({}, state, {
                projectEnvelope: projectEnvelope
            });
        case actionType.IS_FETCHING_SINGLE_PROJECT: return Object.assign({}, state, {
            isFetchingSingleProject: true
        });
        case actionType.HAS_STOPPED_FETCHING_SINGLE_PROJECT: return Object.assign({}, state, {
            isFetchingSingleProject: false
        });
        default: return state;
    }
}