import * as types from '../actions/actionTypes';

let initialState = {
    isFetching: true,
    envelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    },
    isModalOpen: false,
    selectedAlbum: {},
    songsOnSelectedAlbum: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_ALBUMS:
            return Object.assign({}, state, {
                envelope: action.payload
            });
        case types.IS_FETCHING_ALBUMS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.HAS_STOPPED_FETCHING_ALBUMS:
            return Object.assign({}, state, {
                isFetching: false
            });
        case types.GET_ALBUM_BY_ID:
            return Object.assign({}, state, {
                selectedAlbum: action.payload
            });
        case types.IS_FETCHING_ALBUM_BY_ID:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.IS_FETCHING_SONGS_BY_ID_ALBUM:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.GET_SONGS_BY_ALBUM_ID:
            return Object.assign({}, state, {
                songsOnSelectedAlbum: action.payload
            });
        case types.CLEAR_CURRENT_ALBUM:
            return Object.assign({}, state, {
                songsOnSelectedAlbum: action.payload
            });
        default:
            return state;
    }
}
