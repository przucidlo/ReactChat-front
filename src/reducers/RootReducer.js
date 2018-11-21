import {combineReducers} from 'redux';
import authReducer from './AuthReducer';

export default combineReducers({
    auth: authReducer
})