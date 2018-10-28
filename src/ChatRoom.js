import React, { Component} from 'react';
import config from './config/config.json';
import './misc/App.css';
import sampleAvatar from './graphics/sample_avatar.png';
import Cookies from 'js-cookie';
import UserProfile from './UserProfile.js';

export default class ChatRoom extends Component{    
    constructor(props){
        super(props)
        this.state = {
            chatContent: [],
            value: ''
        }

        this.chatRoomId = this.props.chatRoomId;
        this.interval = null;

        this.handleChange = this.handleChange.bind(this);
        this.sendUserMessage = this.sendUserMessage.bind(this);
        this.getLastMessageIndependentId = this.getLastMessageIndependentId.bind(this);
        this.compareLastMessageOnClientSide = this.compareLastMessageOnClientSide.bind(this);
    }

    componentDidMount(){
        this.checkIfNewMessageHasBeenPosted();
    }

    componentWillUnmount(){
        clearInterval(this.interval);
        this.interval = null;
    }

    /*
     *  Displaying Chat content. 
     */

    checkIfNewMessageHasBeenPosted(){
        let interval = setInterval(() => {
            fetch(config.apiUrl + "secure/chatMessages/getLastMessageInChatRoom?roomId=" + this.chatRoomId, {
                method: 'GET',
                headers:{
                    'Authorization': Cookies.get('Authorization')
                }
            }).then(response => {
                
                return response.json();
            }).then(receivedJson => {
                if(this.interval !== null){
                    this.compareLastMessageOnClientSide(receivedJson);
                }
            })
        }, config.chatRefreshRate)
        this.interval = interval;
    }

    compareLastMessageOnClientSide(receivedJson){
        let lastMessageOnClientSide = null;
        if(this.state.chatContent.length !== 0){
            lastMessageOnClientSide = this.state.chatContent[this.state.chatContent.length - 1].roomIndependentMessageId;
        }
        let lastMessageOnServerSideId = receivedJson.roomIndependentMessageId;

        if(lastMessageOnServerSideId !== null || lastMessageOnClientSide !== null){
            if(lastMessageOnClientSide <= lastMessageOnClientSide){
                this.retrieveChatRoomContent();
            }
        }
    }

    retrieveChatRoomContent(){
        fetch(config.apiUrl + "secure/chatMessages?roomId=" + this.chatRoomId, {
            method: 'GET',
            headers:{
                'Authorization': Cookies.get('Authorization')
            }
            }).then(function(response){
                return response.json();
            }).then(receivedJson => {
                if(receivedJson !== this.state.chatContent && this.interval !== null){
                    this.setState({ chatContent: receivedJson});
                }
            })
    }


    renderChatRoomContent(){
        if(this.notEmpty(this.state.chatContent)){
            return this.state.chatContent.map((chatContent) => 

            <div key={chatContent.id} id="message" class="chat-room-message">
                <div id="user_avatar" class="d-flex">
                    <UserProfile width="48" height="48" username={chatContent.sender}/>
                    <div class="align-self-start chat-room-message-content">
                        {chatContent.sender}
                        <a class="font-weight-light chat-room-message-date">{chatContent.timeStamp}</a>
                        <div class="align-self-end ">{chatContent.message}</div>
                    </div>
                </div>
            </div>
            )
        }else{
            return <div className="loader"></div>
        }
    }

    notEmpty(array){
        return typeof array !== undefined;
    }

    /*
     *  User message handling.
     */

    handleChange(event){
        this.setState({value: event.target.value});
    }

    sendUserMessage(event){
        event.preventDefault();

        fetch(config.apiUrl + 'secure/chatMessages', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            },
            body:JSON.stringify({
                'roomId': this.chatRoomId,
                'chatRoomMessage': this.state.value
            })
        });
        this.clearInputField();
    }
    
    clearInputField(){
        this.setState({value: ''});
    }

    getId(){
        return this.state.chatRoomId;
    }

    getLastMessageIndependentId(){
        return this.state.chatContent[this.chatContent.length - 1].roomIndependentMessageId;
    }

    render(){
        return(
            <div class="container-fluid d-flex flex-column h-100">
                <div class="row flex-fill d-flex">
                    <div class="col remove-padding chat-room-messages">
                        {this.renderChatRoomContent()}
                    </div>
                </div>
                <div class="row flex-shrink-0">
                    <div class="col remove-padding">
                        <form onSubmit={this.sendUserMessage}>
                            <input type="message" value={this.state.value} onChange={this.handleChange} class="form-control" placeholder="Insert message..."></input>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}