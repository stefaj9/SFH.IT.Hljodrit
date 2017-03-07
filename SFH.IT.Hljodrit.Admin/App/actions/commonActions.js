import fetch from 'isomorphic-fetch';

export function getZipCodes() {
    return (dispatch) => {
        return fetch('/api/common/zipcodes', {
            method: 'GET'
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        }).then((data) => {
            dispatch(getZipCodesSuccess(data));
        });
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
        type: 'GET_ZIP_CODES',
        payload: zipcodes
    };
};

function getCountriesSuccess(countries) {
    return {
        type: 'GET_COUNTRIES',
        payload: countries
    };
};