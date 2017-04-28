import fetch from 'isomorphic-fetch';
import * as types from '../actions/actionTypes';

export function getZipCodes() {
    return (dispatch) => {
        dispatch(isFetchingZipCodes());
        return fetch('/api/common/zipcodes', {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                dispatch(hasStoppedFetchingZipCodes());
            }
        }).then((data) => {
            dispatch(getZipCodesSuccess(data));
            dispatch(hasStoppedFetchingZipCodes());
        });
    }
}

function isFetchingZipCodes() {
    return {
        type: types.IS_FETCHING_ZIP_CODES,
        payload: {}
    }
}

function hasStoppedFetchingZipCodes() {
    return {
        type: types.HAS_STOPPED_FETCHING_ZIP_CODES,
        payload: {}
    }
}

export function getCountries() {
    return (dispatch) => {
        return fetch('/api/common/countries', {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        }).then((data) => {
            dispatch(getCountriesSuccess(data));
        });
    }
}

function getZipCodesSuccess(zipcodes) {
    return {
        type: types.GET_ZIP_CODES,
        payload: zipcodes
    };
};

function getCountriesSuccess(countries) {
    return {
        type: types.GET_COUNTRIES,
        payload: countries
    };
};