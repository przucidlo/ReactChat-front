import {SOCKET_CONNECT} from '../actions/Types';

export const initializeConnection = () => dispatch => {
    dispatch({
        type: SOCKET_CONNECT
    })
}