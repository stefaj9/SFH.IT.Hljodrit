import _ from 'lodash';
import * as actionType from '../actions/actionTypes';

let initialState = {
    reviewProject: {
        organizationId: -1,
        organization: '',
        projectName: '',
        projectStartDate: '',
        projectEndDate: '',
        projectStatus: '',
        projectStatusName: '',
        submissionUser: '',
        createdOn : '',
        mainArtist : '',
        reviewBy : '',
        reviewComment : '',
        reviewDate : ''
    },
    reviewProjectTracks: [],
    projectEnvelope: {
        objects: [],
        currentPage: -1,
        maximumPage: -1
    },
    isFetchingProjects: true,
    isFetchingSingleProject: true,
    isFetchingSingleProjectTracks: true,
    isPublishingProject: false
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
        case actionType.GET_TRACKS_ON_PROJECT: return Object.assign({}, state, {
            reviewProjectTracks: action.payload
        });
        case actionType.IS_FETCHING_SINGLE_PROJECT_TRACKS: return Object.assign({}, state, {
            isFetchingSingleProjectTracks: true
        });
        case actionType.HAS_STOPPED_FETCHING_SINGLE_PROJECT_TRACKS: return Object.assign({}, state, {
            isFetchingSingleProjectTracks: false
        });
        case actionType.CLEAR_TRACKS_ON_PROJECT: return Object.assign({}, state, {
            reviewProjectTracks: []
        });
        case actionType.IS_PUBLISHING_PROJECT: return Object.assign({}, state, {
            isPublishingProject: true
        });
        case actionType.HAS_STOPPED_PUBLISHING_PROJECT: return Object.assign({}, state, {
            isPublishingProject: false
        });
        default: return state;
    }
}