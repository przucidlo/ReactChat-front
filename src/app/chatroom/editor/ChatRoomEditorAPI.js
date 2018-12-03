import appConfig from '../../../config/appConfig.json';
import Cookies from 'js-cookie';

export const editChatRoom = async (id, name, description) => {
    return fetch(appConfig.apiUrl + 'secure/chatroom', {
        method: 'PUT',
        headers: {
            'Authorization': Cookies.get('Authorization'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': id,
            'name': name,
            'description': description
        })
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse;
    })
}