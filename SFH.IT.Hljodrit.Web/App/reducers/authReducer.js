import * as types from '../actions/actionTypes';

let initialState = {
    userName: '',
    isLoggingIn: false,
    isRegistering: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_USER: return Object.assign({}, state, {
            userName: action.payload
        });
        case types.IS_LOGGING_IN: return Object.assign({}, state, {
            isLoggingIn: true
        });
        case types.HAS_STOPPED_LOGGING_IN: return Object.assign({}, state, {
            isLoggingIn: false
        });
        case types.IS_REGISTERING: return Object.assign({}, state, {
            isRegistering: true
        });
        case types.HAS_STOPPED_REGISTERING: return Object.assign({}, state, {
            isRegistering: false
        });
    }
    return state;
}