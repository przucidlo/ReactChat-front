import SockJs from 'sockjs-client'
import Stomp from 'stompjs';

import {SOCKET_CONNECT} from './actions/Types'; 

export const socketMiddleware = (url) => {
    return storeAPI => {
        let stompClient;
        
        return next => action => {
            switch(action.type){
                case SOCKET_CONNECT:{
                    stompClient = Stomp.over(new SockJs(url));
                    
                    stompClient.connect({}, frame => {
                        console.log('Connected:' + frame);
                    });
                    break;
                }
                default:
                    return next(action);
            }
            
            return next(action);
        }
    }
}