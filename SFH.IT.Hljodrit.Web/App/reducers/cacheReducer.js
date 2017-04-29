import cookie from 'react-cookie';
import * as types from '../actions/actionTypes';

let initialState = {
    group: cookie.load('performer_user_group') !== undefined ? cookie.load('performer_user_group') : []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.SAVE_GROUP_TO_COOKIE: 
            let yearFromNow = new Date();
            yearFromNow.setDate(yearFromNow.getDate() + 365);
            cookie.save('performer_user_group', action.payload, {
                path: '/',
                expires: yearFromNow
            });
            return Object.assign({}, state, {
                group: action.payload
            });
        default: return state;
    }
}