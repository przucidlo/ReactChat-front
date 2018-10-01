import React, { Component} from 'react';
import config from './config/config.json';
import {Alert} from 'reactstrap';


export default class ChatRoom extends Component{    
    constructor(props){
        super(props)
        this.state = {
            chatRoomId: -1,
            chatContent: []
        }
    }

    retrieveChatRoomContent(){
        fetch(config.apiUrl + "chat/chatRoom/getRecentMessages?id=" + this.state.chatRoomId)
            .then(function(response){
                return response.json();
            })
            .then(receivedJson => {
                this.setState({ chatContent: receivedJson});
                console.log(receivedJson);
            })
    }

    changeChatRoom(id){
        this.setState({chatRoomId: id}, this.retrieveChatRoomContent);
    }

    renderChatRoomContent(){
        return this.state.chatContent.map((chatContent) => 
            <p>{chatContent.message}</p>
        )
    }

    render(){
        let chatContent;
        
        if(this.state.chatRoomId != -1){
            chatContent = this.renderChatRoomContent();
        }else{
            chatContent = <Alert color="warning">Please select a ChatRoom in menu located at left side of App</Alert>
        }

        return(
            <div>
                {chatContent}
            </div>
        );
    }
}