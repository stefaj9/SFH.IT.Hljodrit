import * as types from '../actions/actionTypes';

let initialState = {
    isFetching: true,
    envelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    },
    isModalOpen: false,
    selectedException: {}
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
            return Object.assign({}, state, {
                selectedException: action.payload,
                isModalOpen: true
            });
        case types.CLOSE_EXCEPTION_MODAL:
            return Object.assign({}, state, {
                isModalOpen: false
            });
        default:
            return state;
    }
}