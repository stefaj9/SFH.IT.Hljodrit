import React from 'react';
import * as types from '../actions/actionTypes';
import _ from 'lodash';
import moment from 'moment';

moment.locale('is');

let initialState = {
    projectToCreate: {
        basicInfo: {
            projectName: '',
            projectMainArtist: {
                id: -1,
                name: ''
            },
            projectType: {
                id: -1,
                value: ''
            },
            projectStatus: {
                code: '',
                name: ''
            },
            projectYearOfPublish: 1337,
            isWorkingTitle: false
        },
        songs: [],
        publisher: {}
    },
    userProjects: [],
    isCreatingProject: false,
    isFetchingUserProjects: true,
    statusOptions: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.CREATE_PROJECT: return Object.assign({}, state, {
            projectToCreate: {
                basicInfo: {
                    projectName: '',
                    projectMainArtist: {
                        id: -1,
                        name: ''
                    },
                    projectType: {
                        id: -1,
                        value: ''
                    },
                    projectStatus: {
                        code: '',
                        name: ''
                    },
                    projectYearOfPublish: 1337,
                    isWorkingTitle: false
                },
                songs: [],
                publisher: {}
            }
        });
        case types.GET_PROJECT_FOR_USER: 
            let userProjects = _.cloneDeep(action.payload);

            _.forEach(userProjects, project => {
                project.lastModificationDate = moment(project.lastModificationDate).format('LLL');
                project.projectName = <a href={`/app/projects/${project.id}`}>{project.projectName}</a>;
            });

            return Object.assign({}, state, {
                userProjects: userProjects
            });
        case types.IS_FETCHING_USER_PROJECTS: return Object.assign({}, state, {
            isFetchingUserProjects: true
        });
        case types.HAS_STOPPED_FETCHING_USER_PROJECTS: return Object.assign({}, state, {
            isFetchingUserProjects: false
        });
        case types.GET_PROJECT_STATUS: return Object.assign({}, state, {
            statusOptions: action.payload
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