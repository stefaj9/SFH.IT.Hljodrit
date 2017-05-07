import * as actionType from '../actions/actionTypes';
import _ from 'lodash';
import moment from 'moment';


let initialState = {
    mediaRecordingEnvelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    },
    isFetching: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionType.GET_MEDIA:
            let newMediaRecordingEnvelope = _.cloneDeep(action.payload);
            newMediaRecordingEnvelope.objects = newMediaRecordingEnvelope.objects.map(o => {
                return Object.assign({}, o, {
                    releaseDate: { pretty: moment(o.releaseDate).format('ll'), raw: o.releaseDate } 
                });
            });
            return Object.assign({}, state, {
                mediaRecordingEnvelope: newMediaRecordingEnvelope
            });
        case actionType.IS_FETCHING_SONGS: return Object.assign({}, state, {
            isFetching: true
        });
        case actionType.HAS_STOPPED_FETCHING_SONGS: return Object.assign({}, state, {
            isFetching: false
        });
        case actionType.CLEAR_MEDIA: return Object.assign({}, state, {
            mediaRecordingEnvelope: {
                currentPage: -1,
                maximumPage: -1,
                objects: []
            }
        });
        default: return state;
    }
}
