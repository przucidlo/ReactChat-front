import SockJs from 'sockjs-client'
import Stomp from 'stompjs';

import {SOCKET_CONNECT, SOCKET_SUBSCRIBE, SOCKET_SEND} from './actions/Types'; 

export const socketMiddleware = (url) => {
    return store => {
        let stompClient;
        let isConnected = false;
        
        return next => action => {
            
            /*
                Im not really sure If I made a anti-pattern here
                but this is the only way(At least the one I can think off at this point) to avoid TypeError caused by 
                stompClient being undefined
                (It means that connection wasn't intialized in time while other components try to do some actions on it) 
            */
            if(!isConnected && action.type.startsWith('SOCKET') && action.type !== SOCKET_CONNECT){
                socketQueue(action, store);
                return;
            }

            switch(action.type){
                case SOCKET_CONNECT:{
                    stompClient = Stomp.over(new SockJs(url));
                    
                    stompClient.connect({}, frame => {
                        isConnected = true;
                    });
                    break;
                }
                case SOCKET_SUBSCRIBE:{
                    stompClient.subscribe(action.url, (payload) => {
                        action.callback(payload);
                    }, action.headers)
                    break;
                }
                case SOCKET_SEND:{
                    stompClient.send(action.url, action.headers, action.body);
                    break;
                }
                default:
                    return next(action);
            }
            
            return next(action);
        }
    }
}

const socketQueue = (action, store) => {
    setTimeout(() => {
        store.dispatch(action);
    }, 250)
}