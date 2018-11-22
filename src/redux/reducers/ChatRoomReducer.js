import {SET_AUTH_STATUS} from '../actions/Types';

const initialState = {
    chatRooms: []
}

export default function(state = initialState, action){    
    switch(action.type){
        default:
            return state;
    }
}