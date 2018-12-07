import {combineReducers} from 'redux';
import authReducer from './AuthReducer';
import chatRoomReducer from './ChatRoomReducer';
import {USER_LOGOUT} from '../actions/Types';

const appReducer = combineReducers({
    auth: authReducer,
    rooms: chatRoomReducer
})

export default (state, action) => {
    if(action.type === USER_LOGOUT){
        state = undefined;
    }

    return appReducer(state, action);
}