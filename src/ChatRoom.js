import React, { Component} from 'react';
import config from './config/config.json';
import {Alert} from 'reactstrap';
import ChatForm from './Forms';


export default class ChatRoom extends Component{    
    constructor(props){
        super(props)
        this.state = {
            chatRoomId: -1,
            chatContent: [],
        }
    }

    changeChatRoom(id){
        this.setState({chatRoomId: id}, this.retrieveChatRoomContent);
    }

    retrieveChatRoomContent(){
        setInterval(() => {
            fetch(config.apiUrl + "chat/chatRoom/getRecentMessages?id=" + this.state.chatRoomId)
            .then(function(response){
                return response.json();
            })
            .then(receivedJson => {
                this.setState({ chatContent: receivedJson});
                console.log(receivedJson);
            })
        })
    }

    renderChatRoomContent(){

        return this.state.chatContent.map((chatContent) => 
            <p key={chatContent.id}>{chatContent.message}</p>
        )
    }

    render(){
        let chatContent;
        
        if(this.state.chatRoomId !== -1){
            chatContent = this.renderChatRoomContent();
        }else{
            chatContent = <Alert color="warning">Please select a Chat Room.</Alert>
        }

        const divStyle = {
            height:400,
            overflowY: 'scroll'
        }

        return(
            <div>
                <div style={divStyle}>
                    {chatContent}
                </div>
                <ChatForm chatRoomId = {this.state.chatRoomId}/>
            </div>
        );
    }
}