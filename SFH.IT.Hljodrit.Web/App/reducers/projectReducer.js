import * as types from '../actions/actionTypes';

let initialState = {
    projectToCreate: {},
    isCreatingProject: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.CREATE_PROJECT: return Object.assign({}, state, {
            projectToCreate: {}
        });
        case types.IS_CREATING_PROJECT: return Object.assign({}, state, {
            isCreatingProject: true
        });
        case types.HAS_STOPPED_CREATING_PROJECT: return Object.assign({}, state, {
            isCreatingProject: false
        });
    };

    return state;
};