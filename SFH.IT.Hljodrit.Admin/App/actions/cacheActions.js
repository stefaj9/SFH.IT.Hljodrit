import * as types from './actionTypes';

export function saveGroupToCookie(group) {
    return {
        type: types.SAVE_GROUP_TO_COOKIE,
        payload: group
    };
};

export function deleteGroupFromCookie() {
    return {
        type: types.DELETE_GROUP_FROM_COOKIE,
        payload: {}
    };
};