
export const subscribeChatRoom = (socketSubscribe, addMessage, chatRoomId) => {
    let alreadyFetchedLastMessages = false;
    
    socketSubscribe('/user/topic/chatroom/' + chatRoomId, {id: 'user-chatroom-' + chatRoomId}, (payload) => {
        if(!alreadyFetchedLastMessages){
            handleMessageResponse(addMessage, payload, chatRoomId);
            alreadyFetchedLastMessages = true;
        }
    })

    socketSubscribe('/topic/chatroom/' + chatRoomId, {id: 'chatroom-' + chatRoomId}, (payload) => {
        handleMessageResponse(addMessage, payload, chatRoomId);
    })
}

const handleMessageResponse = (addMessage, payload, chatRoomId) => {
    let messageJson = JSON.parse(payload.body);
    
    if(!(messageJson instanceof Array)){
        messageJson = [messageJson];
    }
    messageJson.reverse();

    messageJson.forEach(message => {
        addMessage(chatRoomId, message.id, message.author, message.content, formatTime(message.time));            
    });
}

const formatTime = (time) => {
    return time.replace("T", " ").substring(0, time.length - 9);
}

export const fetchLastMessages = (socketSend, chatRoomId) => {
    socketSend('/websocket/request/chatroom/' + chatRoomId);
}

export const sendChatMessage = (socketSend, chatRoomId, messageContent) => {
    socketSend('/websocket/request/chatroom/' + chatRoomId + '/send', {}, JSON.stringify({'content': messageContent}));
}

