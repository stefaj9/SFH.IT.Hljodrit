import * as types from '../actions/actionTypes';

let initialState = {
    isFetching: true,
    envelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_EXCEPTIONS:
            return Object.assign({}, state, {
                envelope: action.payload
            });
        case types.IS_FETCHING_EXCEPTIONS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.HAS_STOPPED_FETCHING_EXCEPTIONS:
            return Object.assign({}, state, {
                isFetching: false
            });
        case types.SELECT_EXCEPTION:
            debugger;
            return Object.assign({}, state, {
                selectedException: action.payload,
                isModalOpen: true
            });
        default:
            return state;
    }
}