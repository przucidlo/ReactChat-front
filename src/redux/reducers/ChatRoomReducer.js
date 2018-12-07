import {ADD_CHAT_ROOM, ADD_MESSEAGE, UPDATE_CHAT_ROOM, SELECT_CHAT_ROOM} from '../actions/Types';

const initialState = {
    focusedChatRoomId: null,
    chatRooms: []
}

export default function(state = initialState, action){    
    switch(action.type){
        case ADD_CHAT_ROOM:
            return Object.assign({}, state, {
                chatRooms: [...state.chatRooms, {
                        'id': action.id,
                        'name': action.name,
                        'description': action.description,
                        'roomType': action.roomType,
                        'status': action.status,
                        'messages': []
                }]
            })
        case UPDATE_CHAT_ROOM:
            return {
                ...state,
                chatRooms: state.chatRooms.map(chatRoom => chatRoom.id === action.id ?
                    {
                        'id': action.id,
                        'name': action.name,
                        'description': action.description,
                        'roomType': action.roomType,
                        'status': action.status,
                        'messages': chatRoom.messages
                    } : chatRoom)
            }
        case SELECT_CHAT_ROOM:
            return Object.assign({}, state, {
                ...state,
                focusedChatRoomId: action.id
            })
        case ADD_MESSEAGE:
            return Object.assign({}, state, {
                chatRooms: state.chatRooms.map((chatRoom) => {
                    if(chatRoom.id === action.id){
                        return Object.assign({}, chatRoom, {
                            ...chatRoom, 
                                'messages': [...chatRoom.messages, {
                                    'id': action.messageId,
                                    'author': action.author,
                                    'content': action.content,
                                    'time': action.time
                            }]
                        })
                    }
                    return chatRoom;
                })
            })
        default:
            return state;
    }
}