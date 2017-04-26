import * as types from '../actions/actionTypes';
import _ from 'lodash';

let initialState = {
    projectToCreate: {
        basicInfo: {
            projectMainArtist: {
                id: -1,
                name: ''
            },
            projectCountryOfPublish: {
                code: '',
                name: ''
            },
            projectType: {
                id: -1,
                value: ''
            },
            projectYearOfPublish: 1337
        },
        songs: [],
        publisher: {}
    },
    isCreatingProject: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.CREATE_PROJECT: return Object.assign({}, state, {
            projectToCreate: {
                basicInfo: {
                    projectMainArtist: {
                        id: -1,
                        name: ''
                    },
                    projectCountryOfPublish: {
                        code: '',
                        name: ''
                    },
                    projectType: {
                        id: -1,
                        value: ''
                    },
                    projectYearOfPublish: 1337
                },
                songs: [],
                publisher: {}
            }
        });
        case types.IS_CREATING_PROJECT: return Object.assign({}, state, {
            isCreatingProject: true
        });
        case types.HAS_STOPPED_CREATING_PROJECT: return Object.assign({}, state, {
            isCreatingProject: false
        });
        case types.UPDATE_PROJECT_BASIC_INFO: return Object.assign({}, state, {
            projectToCreate: Object.assign({}, state.projectToCreate, {
                basicInfo: action.payload
            })
        });
        case types.UPDATE_PROJECT_SONGS: return Object.assign({}, state, {
            projectToCreate: Object.assign({}, state.projectToCreate, {
                songs: action.payload
            })
        });
        case types.UPDATE_PROJECT_PERFORMERS: 
            let newSongs = _.cloneDeep(state.projectToCreate.songs);
            _.forEach(action.payload, (performers) => {
                let song = _.find(newSongs, (s) => {
                    return s.number === performers.number;
                });
                song.performers = performers.performers;
            });
            return Object.assign({}, state, {
                projectToCreate: Object.assign({}, state.projectToCreate, {
                    songs: newSongs
                })
            });
        case types.UPDATE_PROJECT_PRODUCERS: return Object.assign({}, state, {
            projectToCreate: Object.assign({}, state.projectToCreate, {
                publisher: action.payload
            })
        });
    };

    return state;
};