import _ from 'lodash';

let initialState = {
    instrumentSuggestions: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'GET_INSTRUMENT_SUGGESTIONS':
            let instrumentSuggestions = _.map(action.payload, (i) => { 
                return {
                    idCode: i.idCode,
                    instrumentNameIcelandic: i.instrumentNameIcelandic
                }
            });
            return Object.assign({}, state, {
                instrumentSuggestions: instrumentSuggestions
            });
    }
    return state;
}