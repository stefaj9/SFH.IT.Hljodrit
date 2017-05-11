import * as types from '../actions/actionTypes';
import _ from 'lodash';

let initialState = {
    admins: [],
    isFetchingUsers: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.GET_ALL_USERS_IN_ADMIN_GROUP: return Object.assign({}, state, {
            admins: action.payload
        });
        case types.REMOVE_USER_BY_ID:
            let adminsWithRemovedUser = _.cloneDeep(state.admins);
            _.remove(adminsWithRemovedUser, (n) => { return n.id === action.payload });
            return Object.assign({}, state, {
                admins: adminsWithRemovedUser
            });
        case types.CREATE_USER:
            let adminsWithCreatedUser = _.cloneDeep(state.admins);
            adminsWithCreatedUser = _.concat(adminsWithCreatedUser, action.payload);
            return Object.assign({}, state, {
                admins: adminsWithCreatedUser
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