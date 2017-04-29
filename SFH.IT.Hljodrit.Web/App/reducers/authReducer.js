import * as types from '../actions/actionTypes';

let initialState = {
    userName: '',
    isLoggingIn: false,
    isRegistering: false,
    isLoggedIn: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_USER: 
            // Set token as bearer token in localStorage.
            localStorage.setItem('bt', `${action.payload.token_type} ${action.payload.access_token}`);
            return Object.assign({}, state, {
                userName: action.payload.userName,
                isLoggedIn: true
            });
        case types.LOGOUT: 
            localStorage.removeItem('bt');
            return Object.assign({}, state, {
                userName: '',
                isLoggedIn: false
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
        case types.REFRESH_LOGIN: return Object.assign({}, state, {
            userName: action.payload.Email,
            isLoggedIn: true
        });
    }
    return state;
}