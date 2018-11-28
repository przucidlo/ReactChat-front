
export const subscribeChatRoom = (socketSubscribe, addMessage, chatRoomId) => {
    socketSubscribe('/user/topic/chatroom/' + chatRoomId, {id: 'chatroom-' + chatRoomId}, (payload) => {
        let messageJson = JSON.parse(payload.body);
    
        if(!(messageJson instanceof Array)){
            messageJson = [messageJson];
        }
        
        messageJson.forEach(message => {
            addMessage(chatRoomId, message.id, message.author, message.content, message.time);            
        });
    })
}

export const fetchLastMessages = (socketSend, chatRoomId) => {
    socketSend('/websocket/request/chatroom/' + chatRoomId);
}

export const sendChatMessage = (socketSend, chatRoomId, messageContent) => {
    socketSend('/websocket/request/chatroom/' + chatRoomId + '/send', {}, JSON.stringify({'content': messageContent}));
}

