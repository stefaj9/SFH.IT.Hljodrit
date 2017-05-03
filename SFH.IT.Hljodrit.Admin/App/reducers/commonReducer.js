import * as types from '../actions/actionTypes';

let initialState = {
    zipCodes: [],
    countries: [],
    isFetchingZipCodes: true
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.GET_ZIP_CODES: return Object.assign({}, state, {
            zipCodes: action.payload
        });
        case types.GET_COUNTRIES: return Object.assign({}, state, {
            countries: action.payload
        });
        case types.IS_FETCHING_ZIP_CODES: return Object.assign({}, state, {
            isFetchingZipCodes: true
        });
        case types.HAS_STOPPED_FETCHING_ZIP_CODES: return Object.assign({}, state, {
            isFetchingZipCodes: false
        });
    }
    return state;
}