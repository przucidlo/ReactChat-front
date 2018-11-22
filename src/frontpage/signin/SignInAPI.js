import Cookies from 'js-cookie';
import appConfig from '../../config/appConfig.json'

export async function signIn(username, password){
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
    });
}

export async function checkIfTokenIsValid(){
    if(Cookies.get('Authorization') !== null){
        return fetch(appConfig.apiUrl + "secure/cookieTest", {
            method: 'GET',
            headers:{
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            return response.ok;
        })
    }
}