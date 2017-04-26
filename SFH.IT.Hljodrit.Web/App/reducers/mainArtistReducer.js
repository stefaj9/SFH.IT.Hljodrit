let initialState = {
    mainArtistEnvelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'GET_MAIN_ARTISTS': return Object.assign({}, state, {
            mainArtistEnvelope: action.payload
        });
    }
    return state;
};