import appConfig from '../../../config/appConfig.json';
import Cookies from 'js-cookie';

export const getPublicChatRooms = async () => {
    return fetch(appConfig.apiUrl + 'secure/chatroom', {
        method: 'GET',
        headers: {
            'Authorization': Cookies.get('Authorization'),
        }
    }).then(response => {
        return response.json();
    })
}

export const joinChatRoom = async (id) => {
    return fetch(appConfig.apiUrl + 'secure/chatroom/join', {
        method: 'POST',
        headers: {
            'Authorization': Cookies.get('Authorization'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': id  
        })
    }).then(response => {
        return response.json();
    })
}