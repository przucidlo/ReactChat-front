import Cookies from 'js-cookie';
import appConfig from '../../config/appConfig.json'

export const signIn = async (username, password, setAuthStatus) => {
    return fetch(appConfig.apiUrl + "signIn", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    }).then(response => {
        return response;
    }).then(response => {
        if(response.ok){
            handleSuccessfulSignIn(response.headers, setAuthStatus);
        }
    });
}

const handleSuccessfulSignIn = (responseHeaders, setAuthStatus) => {
    Cookies.set('Authorization', responseHeaders.get('Authorization'), {expires: 7, path:''});
    setAuthStatus(true);
}

export const checkIfTokenIsValid = async () => {
    return fetch(appConfig.apiUrl + "secure/cookieTest", {
        method: 'GET',
        headers:{
            'Authorization': Cookies.get('Authorization')
        }
        }).then(response => {
            return response.ok;
        })
}