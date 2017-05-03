import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

class AuthenticationService {
    isAuthenticated() {
        var url = '/api/validation/validateuser';
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('bt')
            }
        }).then(function (response) {
            return response.ok;
        }).then(function (data) {
            return data;
        });
    }
}

export default new AuthenticationService();