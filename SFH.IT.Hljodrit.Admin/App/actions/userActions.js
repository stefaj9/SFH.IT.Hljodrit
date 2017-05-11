import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';
import { toastr } from 'react-redux-toastr';

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

export function removeUserById(userId) {
    return dispatch => {
        dispatch(isFetchingUsers());
        return fetch(`/api/users/${userId}/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('bt-admin')
            }
        }).then(resp => {
            dispatch(hasStoppedFetchingUsers());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að eyða notanda.');
                dispatch(removeUserByIdSuccess(userId));
            } else {
                toastr.error('Villa!', 'Ekki tókst að eyða notanda.');
            }
        });
    }
}

function removeUserByIdSuccess(userIdToRemove) {
    return {
        type: types.REMOVE_USER_BY_ID,
        payload: userIdToRemove
    };
};

export function createUser(user) {
    return dispatch => {
        dispatch(isFetchingUsers());
        return fetch('/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem('bt-admin')
            },
            body: `Name=${user.name}&Email=${user.email}&Password=${user.password}&ConfirmPassword=${user.confirmPassword}`
        }).then(resp => {
            dispatch(hasStoppedFetchingUsers());
            if (resp.ok) {
                toastr.success('Tókst!', 'Það tókst að búa til notanda.');
                return resp.json();
            } else {
                toastr.error('Villa!', 'Ekki tókst að búa til notanda.');
            }
        }).then(data => {
            if (data) {
                dispatch(createUserSuccess(data));
            }
        });
    }
}

function createUserSuccess(user) {
    return {
        type: types.CREATE_USER,
        payload: user
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
