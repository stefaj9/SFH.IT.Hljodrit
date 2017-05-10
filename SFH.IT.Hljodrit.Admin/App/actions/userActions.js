import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';

export function getAllUserInAdminGroup() {
    return dispatch => {
        dispatch(isFetchingUsers());
        return fetch('/api/users', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then(resp => {
            dispatch(hasStoppedFetchingUsers());
            if (resp.ok) {
                return resp.json();
            }
        }).then(data => {
            dispatch(getAllUsersInAdminGroupSuccess(data));
        });
    }
};

function getAllUsersInAdminGroupSuccess(admins) {
    return {
        type: types.GET_ALL_USERS_IN_ADMIN_GROUP,
        payload: admins
    };
};

function isFetchingUsers() {
    return {
        type: types.IS_FETCHING_USERS,
        payload: {}
    };
};

function hasStoppedFetchingUsers() {
    return {
        type: types.HAS_STOPPED_FETCHING_USERS,
        payload: {}
    };
};
