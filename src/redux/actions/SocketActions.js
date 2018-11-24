import {SOCKET_CONNECT, SOCKET_SUBSCRIBE} from '../actions/Types';

export const initializeConnection = () => dispatch => {
    dispatch({
        type: SOCKET_CONNECT
    })
}

export const subscribe = (url, callback) => dispatch => {
    dispatch({
        type: SOCKET_SUBSCRIBE,
        url: url,
        callback: callback
    })
}