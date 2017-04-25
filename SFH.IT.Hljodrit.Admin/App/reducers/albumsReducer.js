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
    albumBeingCreated: {
        basicInfo: {
            albumMainArtist: {
                id: -1,
                name: ''
            },
            albumCountryOfPublish: {
                code: '',
                name: ''
            },
            albumYearOfPublish: 1337
        },
        songs: [],
        publisher: {}
    },
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
        case types.UPDATE_ALBUM_BASIC_INFO: return Object.assign({}, state, {
            albumBeingCreated: {
                basicInfo: action.payload,
                songs: state.albumBeingCreated.songs,
                publisher: state.albumBeingCreated.publisher
            }
        });
        case types.UPDATE_ALBUM_SONGS: 
            return Object.assign({}, state, {
                albumBeingCreated: {
                    basicInfo: state.albumBeingCreated.basicInfo,
                    songs: action.payload,
                    publisher: state.albumBeingCreated.publisher
                }
            });
        case types.UPDATE_ALBUM_PERFORMERS: 
            let newSongs = _.cloneDeep(state.albumBeingCreated.songs);
            _.forEach(action.payload, (performers) => {
                let song = _.find(newSongs, (s) => {
                    return s.number === performers.number;
                });
                song.performers = performers.performers;
            });
            return Object.assign({}, state, {
                albumBeingCreated: {
                    basicInfo: state.albumBeingCreated.basicInfo,
                    songs: newSongs,
                    publisher: state.albumBeingCreated.publisher
                }
            });
        case types.UPDATE_ALBUM_PRODUCERS: return Object.assign({}, state, {
            albumBeingCreated: {
                basicInfo: state.albumBeingCreated.basicInfo,
                songs: state.albumBeingCreated.songs,
                publisher: action.payload
            }
        });
        case types.CREATE_ALBUM: return Object.assign({}, state, {
            albumBeingCreated: {
                basicInfo: {
                    albumMainArtist: {
                        id: -1,
                        name: ''
                    },
                    albumCountryOfPublish: {
                        code: '',
                        name: ''
                    },
                    albumYearOfPublish: 1337
                },
                songs: [],
                publisher: {}
            }
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
