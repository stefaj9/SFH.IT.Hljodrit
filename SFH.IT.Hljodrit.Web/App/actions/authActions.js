import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';

export function registerUser(name, email, password, confirmPassword) {
    return () => {
        return fetch('/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `Name=${name}&Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}`
        }).then(resp => {
            if (resp.ok) {
                toastr.success('Tókst!', 'Nýskráning tókst. Innan skamms mun þér berast póstur til þess að staðfesta netfangið þitt.');
                browserHistory.push('/');
            } else {
                toastr.error('Villa!', 'Ekki tókst að nýskrá. Vinsamlegast reyndu aftur síðar.');
            }
        })
    }
}