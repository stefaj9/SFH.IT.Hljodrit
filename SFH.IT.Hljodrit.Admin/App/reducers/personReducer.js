import * as actionType from '../actions/actionTypes';

let initialState = {
    personEnvelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    },
    personRoles: [],
    selectedPerson: {},
    isFetchingPerson: true
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionType.GET_PERSONS_BY_CRITERIA: return Object.assign({}, state, {
            personEnvelope: action.payload
        });
        case actionType.GET_PERSONS_ROLES: return Object.assign({}, state, {
            personRoles: action.payload
        });
        case actionType.GET_PERSON_BY_ID: return Object.assign({}, state, {
            selectedPerson: action.payload
        });
        case actionType.CLEAR_SELECTED_PERSON: return Object.assign({}, state, {
            selectedPerson: {}
        });
        case actionType.IS_FETCHING_PERSON: return Object.assign({}, state, {
            isFetchingPerson: true
        });
        case actionType.HAS_STOPPED_FETCHING_PERSON: return Object.assign({}, state, {
            isFetchingPerson: false
        });
    }

    return state;
}
