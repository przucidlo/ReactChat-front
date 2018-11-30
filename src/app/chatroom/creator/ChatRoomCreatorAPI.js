import appConfig from '../../../config/config.json'
import Cookies from 'js-cookie';

export const createChatRoom = (name, description) => {
    return fetch(appConfig.apiUrl + 'secure/chatroom', {
        method: 'POST',
        headers: {
            'Authorization': Cookies.get('Authorization')
        },
        body: JSON.stringify({
            'name': name,
            'description': description,
            'type': 'PUBLIC'
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse;
        })
    })
}