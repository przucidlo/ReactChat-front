import {combineReducers} from 'redux';
import authReducer from './AuthReducer';
import chatRoomReducer from './ChatRoomReducer';

export default combineReducers({
    auth: authReducer,
    chatRooms:chatRoomReducer
})