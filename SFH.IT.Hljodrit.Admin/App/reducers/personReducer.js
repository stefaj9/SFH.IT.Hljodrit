import * as actionType from '../actions/actionTypes';
import _ from 'lodash';
import moment from 'moment';

let initialState = {
    personEnvelope: {
        currentPage: -1,
        maximumPage: -1,
        objects: []
    },
    personRoles: [],
    selectedPerson: {},
    selectedPersonMedia: [],
    isFetchingPerson: true,
    isFetchingPersonMedia: true
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionType.GET_PERSONS_BY_CRITERIA: return Object.assign({}, state, {
            personEnvelope: action.payload
        });
        case actionType.GET_PERSONS_ROLES: return Object.assign({}, state, {
            personRoles: action.payload
        });
        case actionType.GET_PERSON_BY_ID: return Object.assign({}, state, {
            selectedPerson: action.payload
        });
        case actionType.UPDATE_PERSON_BY_ID: return Object.assign({}, state, {
            selectedPerson: action.payload
        });
        case actionType.GET_MEDIA_ASSOCIATED_WITH_PERSON:
            let media = _.cloneDeep(action.payload);
            moment.locale('is');
            media = media.map(m => {
                return Object.assign({}, m, {
                    instruments: m.instruments.map(instrument => {
                        return instrument.instrumentNameIcelandic;
                    }),
                    roles: m.roles.map(role => {
                        return role.name
                    }),
                    releaseDate: moment(m.releaseDate).format('LL')
                });
            });
            return Object.assign({}, state, {
                selectedPersonMedia: media
            });
        case actionType.CLEAR_SELECTED_PERSON: return Object.assign({}, state, {
            selectedPerson: {}
        });
        case actionType.IS_FETCHING_PERSON: return Object.assign({}, state, {
            isFetchingPerson: true
        });
        case actionType.HAS_STOPPED_FETCHING_PERSON: return Object.assign({}, state, {
            isFetchingPerson: false
        });
        case actionType.IS_FETCHING_PERSON_MEDIA: return Object.assign({}, state, {
            isFetchingPersonMedia: true
        });
        case actionType.HAS_STOPPED_FETCHING_PERSON_MEDIA: return Object.assign({}, state, {
            isFetchingPersonMedia: false
        });
    }

    return state;
}
