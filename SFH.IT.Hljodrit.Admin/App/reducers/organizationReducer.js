import * as actionType from '../actions/actionTypes';

let initialState = {
    organizationEnvelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    },
    selectedOrganizationIsrcSeries: [],
    selectedOrganizationLabels: []
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
    }
    return state;
}