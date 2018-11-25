export const fetchUserChatRoomList = (socketSend) => {
    socketSend('/websocket/request/chatroom/list');
}

export const subscribeChatRoomListTopic = (socketSubscribe, addChatRoom, updateChatRoom, clientChatRoomList) => {
    socketSubscribe('/user/topic/chatroom/list', (payload) => {
        handleChatRoomListChange(payload, addChatRoom, updateChatRoom,clientChatRoomList);    
    })
}

const handleChatRoomListChange = (payload, addChatRoom, updateChatRoom, clientChatRoomList) => {
    let chatRoomListJson;
    
    if(JSON.parse(payload.body) instanceof Array){
        chatRoomListJson = JSON.parse(payload.body); 
    }else{
        chatRoomListJson = [JSON.parse(payload.body)]
    }

    chatRoomListJson.forEach(chatRoom => {
        if(doesStoreContainThisChatRoom(chatRoom, clientChatRoomList)){
            updateChatRoom(chatRoom.id, chatRoom.name, chatRoom.description, chatRoom.type, chatRoom.status);
        }else{
            addChatRoom(chatRoom.id, chatRoom.name, chatRoom.description, chatRoom.type, chatRoom.status);
        }
    });
}

const doesStoreContainThisChatRoom = (chatRoom, clientChatRoomList) => {
    const roomList = clientChatRoomList(); 

    for(let i = 0; i < roomList.length; i++){
        if(roomList[i].id === chatRoom.id)
            return true;
    }

    return false;
}