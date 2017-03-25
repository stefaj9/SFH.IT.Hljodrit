let initialState = {
    organizationEnvelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    },
    selectedOrganizationLabels: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_PUBLISHERS': return Object.assign({}, state, {
            organizationEnvelope: action.payload
        });
        case 'GET_PUBLISHER_LABELS': return Object.assign({}, state, {
            selectedOrganizationLabels: action.payload
        });
    }
    return state;
}