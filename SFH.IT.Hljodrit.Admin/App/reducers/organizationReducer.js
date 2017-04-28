import * as actionType from '../actions/actionTypes';
import _ from 'lodash';

let initialState = {
    organizationEnvelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    },
    selectedOrganizationIsrcSeries: [],
    selectedOrganizationLabels: [],
    selectedOrganization: {},
    isCreatingLabel: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionType.GET_ALL_PUBLISHERS: return Object.assign({}, state, {
            organizationEnvelope: action.payload
        });
        case actionType.GET_PUBLISHER_LABELS_BY_ID: return Object.assign({}, state, {
            selectedOrganizationLabels: action.payload
        });
        case actionType.GET_PUBLISHER_ISRC_SERIES_BY_ID: return Object.assign({}, state, {
            selectedOrganizationIsrcSeries: action.payload
        });
        case actionType.ADD_LABEL_TO_PUBLISHER_BY_ID:
            let labels = _.cloneDeep(state.selectedOrganizationLabels);
            labels = _.concat(labels, action.payload);
            return Object.assign({}, state, {
                selectedOrganizationLabels: labels
            });
        case actionType.IS_CREATING_LABEL: return Object.assign({}, state, {
            isCreatingLabel: true
        });
        case actionType.HAS_STOPPED_CREATING_LABEL: return Object.assign({}, state, {
            isCreatingLabel: false
        });
        case actionType.GET_PUBLISHER_BY_ID:
            let newOrganization = _.cloneDeep(action.payload);
            newOrganization.albums = newOrganization.albums.map(o => {
                return Object.assign({}, o, {
                    numberOfTracks: o.numberOfTracks !== -1 ? o.numberOfTracks : 'Ekki skráð'
                });
            });

            return Object.assign({}, state, {
                selectedOrganization: newOrganization
            });
    }
    return state;
}