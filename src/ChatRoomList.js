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
        return(
            <div>
                <ListGroup>
                    {
                    this.state.chatRooms[0] != null &&
                        this.renderChatRoomsList()
                    }
                </ListGroup>
            </div>
        );
    }
}