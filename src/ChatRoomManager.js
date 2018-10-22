import React from 'react'
import owl from './graphics/owl.svg';
import ChatRoom from './ChatRoom';

export default class ChatRoomManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedChatRoom: null,
            chatRooms: new Map()
        }

        this.selectChatRoom = this.selectChatRoom.bind(this);
        this.loadChatRoom = this.loadChatRoom.bind(this);
    }

    selectChatRoom(id){
        let wasRoomLoadedBefore = this.state.chatRooms.get(id);
        console.log(wasRoomLoadedBefore);
        
        if(wasRoomLoadedBefore !== undefined){
            this.setState({selectedChatRoom: wasRoomLoadedBefore});
        }else{
            this.setState({selectedChatRoom: this.loadChatRoom(id)});
        }
    }

    loadChatRoom(id){
        let chatRoomsMap = this.state.chatRooms;
        let newChatRoom = <ChatRoom chatRoomId={id}/>;

        chatRoomsMap.set(id, newChatRoom);

        this.setState({chatRooms: chatRoomsMap});

        return newChatRoom;
    }

    render(){
        if(this.state.selectedChatRoom === null)
            return (
                <div className="d-flex flex-column h-100 owl">
                    <div className="flex-row">
                        <img src={owl} width="156" height="156"/>
                        <div className="flex-row owl-text">
                            Hey, why don't you select a channel?
                        </div>
                        <div className="flex-row owl-text">
                            ~Julius Caesar
                        </div>
                    </div>
                </div>
            )

        return (
            <div className="d-flex h-100">
                {this.state.selectedChatRoom}                
            </div>
        )
    }
}