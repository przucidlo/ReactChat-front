import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers/RootReducer';
import thunk from 'redux-thunk';
import {socketMiddleware} from './SocketMiddleware';

const middleware = [thunk, socketMiddleware('http://localhost:8080/api/secure/endpoint')]

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...middleware)));

export default store;