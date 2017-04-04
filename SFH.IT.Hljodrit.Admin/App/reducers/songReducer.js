import * as actionType from '../actions/actionTypes';

let initialState = {
    songEnvelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    },
    isFetching: true
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionType.GET_SONGS: return Object.assign({}, state, {
            songEnvelope: action.payload
        });
        case actionType.IS_FETCHING_SONGS: return Object.assign({}, state, {
            isFetching: true
        });
        case actionType.HAS_STOPPED_FETCHING_SONGS: return Object.assign({}, state, {
            isFetching: false
        });
        case actionType.CLEAR_SONGS: return Object.assign({}, state, {
            songEnvelope: {
                currentPage: -1,
                maximumPage: -1,
                objects: []
            }
        });
        default: return state;
    }
}