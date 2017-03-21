let initialState = {
    isFetchingList: true,
    isRegisteringIndividual: false,
    registerIndividualId: -1
}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'IS_FETCHING_LIST': Object.assign({}, state, {
            isFetchingList: true
        });
        case 'HAS_STOPPED_FETCHING_LIST': Object.assign({}, state, {
            isFetchingList: false
        });
        case 'IS_REGISTERING_INDIVIDUAL': Object.assign({}, state, {
            isRegisteringIndividual: true
        });
        case 'HAS_STOPPED_REGISTERING_INDIVIDUAL': Object.assign({}, state, {
            isRegisteringIndividual: false
        });
        case 'REGISTER_INDIVIDUAL': Object.assign({}, state, {
            registerIndividualId: action.payload
        })
        case 'RESET_REGISTER_ID': Object.assign({}, state, {
            registerIndividualId: -1
        });
    }
    return state;
}