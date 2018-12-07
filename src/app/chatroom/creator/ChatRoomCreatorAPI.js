import appConfig from './../../../config/appConfig.json';
import Cookies from 'js-cookie';

export const createChatRoom = async (name, description) => {
    return fetch(appConfig.apiUrl + 'secure/chatroom', {
        method: 'POST',
        headers: {
            'Authorization': Cookies.get('Authorization'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'description': description,
            'type': 'PUBLIC'
        })
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse;
    })
}



