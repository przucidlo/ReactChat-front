import React, { Component} from 'react';
import config from './config/config.json';
import {ListGroup, ListGroupItem} from 'reactstrap';

export default class ChatRoomList extends Component{    
    constructor(props){
        super(props)
        this.state = {
            chatRooms: []
        }

        this.retrieveChatRoomsFromAPI = this.retrieveChatRoomsFromAPI.bind(this);
    }

    componentWillMount(){
        this.retrieveChatRoomsFromAPI();
    }

    retrieveChatRoomsFromAPI(){
        fetch(config.apiUrl + "chat/getChatRoomList")
            .then(function(response){
                return response.json();
            })
            .then(receivedJson => {
                this.setState({ chatRooms: receivedJson});
            })
    }

    renderChatRoomsList(){
        return this.state.chatRooms.map((chatRoom) => 
            <ListGroupItem key={chatRoom.id} tag="button" onClick={() => this.changeRoom(chatRoom.id)} action>{chatRoom.name}</ListGroupItem>
        )
    }

    changeRoom(id){
        this.props.changeChatRoom(id);
    }

    render(){
        const isAnyChatAvailable = this.state.chatRooms;
        let chatRoomsList;

        if(isAnyChatAvailable && isAnyChatAvailable.length > 0){
            chatRoomsList = this.renderChatRoomsList();
        }else{
            chatRoomsList = <h5>It seems there is no ChatRooms :(</h5>
        }

        return(
            <div>
                <ListGroup>
                    {chatRoomsList}
                </ListGroup>
            </div>
        );
    }
}