import { SET_AUTH_STATUS } from '../actions/Types';

const initialState = {
    authenticated: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTH_STATUS:
            return Object.assign({}, state, {
                authenticated: action.payload
            })
        default:
            return state;
    }
}