import * as types from '../actions/actionTypes';

let initialState = {
    isFetching: true,
    envelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    },
    isModalOpen: false,
    selectedAlbum: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_ALBUMS:
            return Object.assign({}, state, {
                envelope: action.payload
            });
        case types.IS_FETCHING_ALBUMS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.HAS_STOPPED_FETCHING_ALBUMS:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}
