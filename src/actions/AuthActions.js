import {SET_AUTH_STATUS} from './Types.js';

export const setAuthStatus = (status) => dispatch => {
    dispatch({
        type: SET_AUTH_STATUS,
        payload: status
    });
};