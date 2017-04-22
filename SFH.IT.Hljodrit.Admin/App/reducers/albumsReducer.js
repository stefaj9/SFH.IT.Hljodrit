import * as types from '../actions/actionTypes';
import _ from 'lodash';

let initialState = {
    isFetching: true,
    isFetchingSongs: true,
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
        case types.REMOVE_SONGS_FROM_ALBUM:
            let currentSongs = _.cloneDeep(state.songsOnSelectedAlbum);
            _.forEach(action.payload, id => {
                _.remove(currentSongs, song => { return song.songId === id });
            });
            return Object.assign({}, state, {
                songsOnSelectedAlbum: currentSongs
            });
        case types.IS_FETCHING_ALBUM_BY_ID:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.IS_FETCHING_SONGS_BY_ID_ALBUM:
            return Object.assign({}, state, {
                isFetchingSongs: true
            });

        case types.HAS_STOPPED_FETCHING_SONGS_ON_ALBUM:
            return Object.assign({}, state, {
                isFetchingSongs: false
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
