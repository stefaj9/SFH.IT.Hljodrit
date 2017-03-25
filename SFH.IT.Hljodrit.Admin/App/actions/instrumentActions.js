import fetch from 'isomorphic-fetch';

export function getInstrumentSuggestions() {
    return (dispatch) => {
        return fetch('/api/instruments', {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        }).then((data) => {
            dispatch(getInstrumentSuggestionsSuccess(data));
        });
    }
}

function getInstrumentSuggestionsSuccess(data) {
    return {
        type: 'GET_INSTRUMENT_SUGGESTIONS',
        payload: data
    };
};