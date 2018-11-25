import {ADD_CHAT_ROOM, ADD_MESSEAGE, UPDATE_CHAT_ROOM} from '../actions/Types';

export const addChatRoom = (id, name, description, roomType, status) => dispatch => {
    dispatch({
        type: ADD_CHAT_ROOM,
        id: id,
        name: name,
        description: description,
        roomType: roomType,
        status: status
    })
}

export const updateChatRoom = (id, name, description, roomType, status) => dispatch => {
    dispatch({
        type: UPDATE_CHAT_ROOM,
        id: id,
        name: name,
        description: description,
        roomType: roomType,
        status: status
    })
}

export const addMessage = (roomId, messageId, author, content, time) => dispatch => {
    dispatch({
        type: ADD_MESSEAGE,
        id: roomId,
        messageId: messageId,
        author: author,
        content: content,
        time: time
    })
}