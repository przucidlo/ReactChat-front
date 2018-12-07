export const fetchUserChatRoomList = (socketSend) => {
    socketSend('/websocket/request/chatroom/list');
}

export const subscribeChatRoomListTopic = (socketSubscribe, addChatRoom, updateChatRoom, clientChatRoomList) => {
    socketSubscribe('/user/topic/chatRoomList', {} ,(payload) => {
        handleChatRoomListChange(payload, addChatRoom, updateChatRoom,clientChatRoomList);    
    })
}

const handleChatRoomListChange = (payload, addChatRoom, updateChatRoom, clientChatRoomList) => {
    let chatRoomListJson = JSON.parse(payload.body);
    
    if(!(chatRoomListJson instanceof Array)){
        chatRoomListJson = [chatRoomListJson];
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