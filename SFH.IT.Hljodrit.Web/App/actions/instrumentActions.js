import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';

export function getInstrumentSuggestions() {
    return (dispatch) => {
        return fetch('/api/instruments', {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem('bt')
            }
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
        type: types.GET_INSTRUMENT_SUGGESTIONS,
        payload: data
    };
};