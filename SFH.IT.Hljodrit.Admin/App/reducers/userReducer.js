import * as types from '../actions/actionTypes';

let initialState = {
    admins: [],
    isFetchingUsers: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.GET_ALL_USERS_IN_ADMIN_GROUP: return Object.assign({}, state, {
            admins: action.payload
        });
        case types.IS_FETCHING_USERS: return Object.assign({}, state, {
            isFetchingUsers: true
        });
        case types.HAS_STOPPED_FETCHING_USERS: return Object.assign({}, state, {
            isFetchingUsers: false
        });
        default: return state;
    }
};