import * as types from '../actions/actionTypes';


let initialState = {
    isFetchingList: true,
    isRegisteringIndividual: false,
    registerIndividualId: -1,
    isUpdatingData: false,
    data: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'IS_FETCHING_LIST': return Object.assign({}, state, {
            isFetchingList: true
        });
        case 'HAS_STOPPED_FETCHING_LIST': return Object.assign({}, state, {
            isFetchingList: false
        });
        case 'IS_REGISTERING_INDIVIDUAL': return Object.assign({}, state, {
            isRegisteringIndividual: true
        });
        case 'HAS_STOPPED_REGISTERING_INDIVIDUAL': return Object.assign({}, state, {
            isRegisteringIndividual: false
        });
        case 'REGISTER_INDIVIDUAL': return Object.assign({}, state, {
            registerIndividualId: action.payload
        });
        case 'RESET_REGISTER_ID': return Object.assign({}, state, {
            registerIndividualId: -1
        });
        case types.IS_UPDATING_DATA: return Object.assign({}, state, {
            isUpdatingData: true
        });
        case types.HAS_STOPPED_UPDATING_DATA: return Object.assign({}, state, {
            isUpdatingData: false
        });
        case types.UPDATE_SUCCESS: return Object.assign({}, state, {
            data: action.payload
        });
    }
    return state;
}
