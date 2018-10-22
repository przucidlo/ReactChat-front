import React, { Component} from 'react';
import config from './config/config.json';
import {Alert, Form, FormGroup, Input, Button, Badge} from 'reactstrap';
import './misc/App.css';
import sampleAvatar from './graphics/sample_avatar.png';
import Cookies from 'js-cookie';

export default class ChatRoom extends Component{    
    constructor(props){
        super(props)
        
        this.doesUserUsedScroll = false
        this.state = {
            chatRoomId: this.props.chatRoomId,
            chatContent: [],
            interval : null,
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendUserMessage = this.sendUserMessage.bind(this);
    }

    componentDidMount(){
        this.retrieveChatRoomContent();
    }

    /*
     *  Chatroom management
     */

    changeChatRoom(id){
        this.doesUserUsedScroll = false;
        this.clearChatContent();
        this.restartInterval();
        this.setState({chatRoomId: id}, this.retrieveChatRoomContent);
    }

    restartInterval(){
        if(this.state.interval !== null){
            clearInterval(this.state.interval);
        }
    }

    clearChatContent(){
        if(this.notEmpty(this.state.chatContent)){
            this.setState({chatContent: []});
        }
    }

    /*
     *  Displaying Chat content. 
     */

    retrieveChatRoomContent(){
        let interval = setInterval(() => {
            fetch(config.apiUrl + "secure/chatMessages?roomId=" + this.state.chatRoomId, {
                method: 'GET',
                headers:{
                    'Authorization': Cookies.get('Authorization')
                }
            })
            .then(function(response){
                return response.json();
            })
            .then(receivedJson => {
                if(receivedJson !== this.state.chatContent){
                    this.setState({ chatContent: receivedJson});
                }
                this.scrollToBottomConditional();
            })
        }, config.chatRefreshRate)
        this.setState({interval: interval});
    }

    scrollToBottomConditional(){
        if(!this.doesUserUsedScroll){
            this.chatContentDiv.scrollTop = this.chatContentDiv.scrollHeight;
        }
        this.checkIfUserUsedScroll();
    }

    checkIfUserUsedScroll(){
        console.log("1:" + this.chatContentDiv.scrollTop + "2:" + this.chatContentDiv.scrollHeight + this.chatContentDiv.clientHeight);
        if(this.chatContentDiv.scrollTop !== this.chatContentDiv.scrollHeight + this.chatContentDiv.clientHeight){
            this.doesUserUsedScroll = true;
            console.log("Set true");
        }else{
            this.doesUserUsedScroll = false;
            console.log("Set false");
        }
    }

    renderChatRoomContent(){
        if(this.notEmpty(this.state.chatContent)){
            return this.state.chatContent.map((chatContent) => 

            <div id="message" class="chat-room-message">
                <div id="user_avatar" class="d-flex">
                    <img src={sampleAvatar} class="chat-room-message-avatar"></img>
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
        return typeof array !== undefined && array.length > 0;
    }

    /*
     *  User message handling.
     */

    handleChange(event){
        this.setState({value: event.target.value});
    }

    sendUserMessage(event){
        event.preventDefault();
        console.log(this.props.userToken())
        fetch(config.apiUrl + '/chat/chatRoom/addNewMessage', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'token': this.props.userToken(),
                'chatRoomId': this.state.chatRoomId,
                'message': this.state.value
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
                        <form>
                            <input type="message" class="form-control" placeholder="Insert message..."></input>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}