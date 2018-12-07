import appConfig from '../../config/appConfig.json';
import {signIn} from '../signin/SignInAPI';

export const signUp = async (username, password, setAuthStatus) => {
    return fetch(appConfig.apiUrl + 'signUp', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    }).then((response => {
        return response;
    })).then((response => {        
        checkIfSignUpWasSuccessful(username, password, response, setAuthStatus);
    }))
}

export const checkIfSignUpWasSuccessful = async (username, password, response, setAuthStatus) => {
    if(response.ok){
        signIn(username, password, setAuthStatus);
    }
}

