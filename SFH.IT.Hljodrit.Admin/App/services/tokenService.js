import AuthenticationService from './authenticationService';
import promise from 'promise-polyfill';

class TokenService {
    isValidToken() {
        var bt = localStorage.getItem('bt-admin');
        if (bt !== null) {
            return AuthenticationService.isAuthenticated();
        } else {
            return new promise(function (resolve, reject) {
                reject(Error('Your token is not valid'));
            });
        }
    }
}

export default new TokenService();