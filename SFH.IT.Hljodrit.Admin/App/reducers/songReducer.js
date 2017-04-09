import * as actionType from '../actions/actionTypes';

let initialState = {
    songEnvelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    },
    mediaRecordingEnvelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    },
    isFetching: true,
    selectedSong: {},
    musiciansOnSelectedSong: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionType.GET_SONGS: return Object.assign({}, state, {
            songEnvelope: action.payload
        });
        case actionType.GET_SONG_BY_ID: return Object.assign({}, state, {
            selectedSong: action.payload
        });
        case actionType.GET_ALL_MUSICIANS_ON_SONG: return Object.assign({}, state, {
            musiciansOnSelectedSong: action.payload
        });
        case actionType.GET_MEDIA: return Object.assign({}, state, {
            mediaRecordingEnvelope: action.payload
        });
        case actionType.IS_FETCHING_SONGS: return Object.assign({}, state, {
            isFetching: true
        });
        case actionType.HAS_STOPPED_FETCHING_SONGS: return Object.assign({}, state, {
            isFetching: false
        });
        case actionType.CLEAR_SONGS: return Object.assign({}, state, {
            songEnvelope: {
                currentPage: -1,
                maximumPage: -1,
                objects: []
            }
        });
        case actionType.CLEAR_MEDIA: return Object.assign({}, state, {
            mediaRecordingEnvelope: {
                currentPage: -1,
                maximumPage: -1,
                objects: []
            }
        });
        case actionType.CLEAR_SONG_SELECTION: return Object.assign({}, state, {
            selectedSong: {}
        });
        default: return state;
    }
}