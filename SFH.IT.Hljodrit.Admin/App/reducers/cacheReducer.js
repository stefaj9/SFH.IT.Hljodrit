import cookie from 'react-cookie';
import * as types from '../actions/actionTypes';

let initialState = {
    group: cookie.load('performer_group') !== undefined ? cookie.load('performer_group') : []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.SAVE_GROUP_TO_COOKIE: 
            let yearFromNow = new Date();
            yearFromNow.setDate(yearFromNow.getDate() + 365);
            cookie.save('performer_group', action.payload, {
                path: '/',
                expires: yearFromNow
            });
            return Object.assign({}, state, {
                group: action.payload
            });
        case types.DELETE_GROUP_FROM_COOKIE:
            cookie.remove('performer_group');
            return Object.assign({}, state, {
                group: []
            });
        default: return state;
    }
}