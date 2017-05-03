let initialState = {
    zipCodes: [],
    countries: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'GET_ZIP_CODES': return Object.assign({}, state, {
            zipCodes: action.payload ? action.payload : []
        });
        case 'GET_COUNTRIES': return Object.assign({}, state, {
            countries: action.payload ? action.payload : []
        });
    }
    return state;
}