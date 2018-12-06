import {SET_AUTH_STATUS, USER_LOGOUT} from './Types.js';

export const setAuthStatus = (status) => dispatch => {
    dispatch({
        type: SET_AUTH_STATUS,
        payload: status
    });
};

export const userLogout = () => dispatch => {
    dispatch({
        type: USER_LOGOUT
    })
}