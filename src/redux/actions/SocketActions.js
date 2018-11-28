import {SOCKET_CONNECT, SOCKET_SUBSCRIBE, SOCKET_SEND} from '../actions/Types';

export const initializeConnection = () => dispatch => {
    dispatch({
        type: SOCKET_CONNECT
    })
}

export const socketSubscribe = (url, headers, callback) => dispatch => {
    dispatch({
        type: SOCKET_SUBSCRIBE,
        url: url,
        headers: headers,
        callback: callback
    })
}

export const socketSend = (url, headers = {}, body = {}) => dispatch => {
    dispatch({
        type: SOCKET_SEND,
        url: url,
        headers: headers,
        body: body
    })
}