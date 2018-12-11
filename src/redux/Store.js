import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers/RootReducer';
import thunk from 'redux-thunk';
import {socketMiddleware} from './SocketMiddleware';
import appConfig from '../config/appConfig.json';

const middleware = [thunk, socketMiddleware(appConfig.websocketEndpoint)];

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...middleware)));


export default store;