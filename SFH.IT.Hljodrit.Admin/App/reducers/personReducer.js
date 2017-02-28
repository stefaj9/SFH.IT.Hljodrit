let initialState = {
    isFetching: true,
    personEnvelope: {
        currentPage: -1,
        maximumPage: -1,
        persons: []
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'GET_PERSONS_BY_CRITERIA': Object.assign({}, state, {
            personEnvelope: action.payload
        });
        case 'IS_FETCHING_PERSONS': Object.assign({}, state, {
            isFetching: true
        });
        case 'HAS_STOPPED_FETCHING_PERSONS': Object.assign({}, state, {
            isFetching: false
        });
    }

    return state;
}
