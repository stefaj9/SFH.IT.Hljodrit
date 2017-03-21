let initialState = {
    personEnvelope: {
        currentPage: -1,
        maximumPage: -1,
        persons: []
    },
    personRoles: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'GET_PERSONS_BY_CRITERIA': return Object.assign({}, state, {
            personEnvelope: action.payload
        });
        case 'GET_PERSONS_ROLES': return Object.assign({}, state, {
            personRoles: action.payload
        });
        case 'IS_FETCHING_PERSONS': return Object.assign({}, state, {
            isFetching: true
        });
        case 'HAS_STOPPED_FETCHING_PERSONS': return Object.assign({}, state, {
            isFetching: false
        });
        case 'REGISTER_PERSON': return Object.assign({}, state, {
            registerUserId: action.payload
        });
        case 'IS_REGISTERING_PERSON': return Object.assign({}, state, {
            isRegistering: true
        });
        case 'HAS_STOPPED_REGISTERING_PERSON': return Object.assign({}, state, {
            isRegistering: false
        });
        case 'RESET_REGISTER_PERSON': return Object.assign({}, state, {
            registerUserId: -1
        });
    }

    return state;
}
