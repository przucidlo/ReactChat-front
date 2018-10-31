import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import config from './config/config.json';
import './misc/App.css';
import Cookies from 'js-cookie';
import UserProfile from './UserProfile.js';
import {Progress} from 'reactstrap';

export default class ChatRoom extends Component{    
    constructor(props){
        super(props)
        this.state = {
            chatContent: [],
            isLoading: true,
            value: ''
        }

        this.chatRoomId = this.props.chatRoomId;
        this.interval = null;
        
        this.latestMessageRef = React.createRef();
        this.messageContainerRef = React.createRef();
        this.messageContainerNode = null;
        this.isMessageContainerScrolledToTop = false;

        this.handleChange = this.handleChange.bind(this);
        this.sendUserMessage = this.sendUserMessage.bind(this);
        this.getLastMessageIndependentId = this.getLastMessageIndependentId.bind(this);
        this.compareLastMessageOnClientSide = this.compareLastMessageOnClientSide.bind(this);
    }

    componentDidMount(){
        this.messageContainerNode = ReactDOM.findDOMNode(this.messageContainerRef.current);
        this.checkIfNewMessageHasBeenPosted();
    }

    componentWillUnmount(){
        clearInterval(this.interval);
        this.interval = null;
    }

    componentDidUpdate(){
        if(this.latestMessageRef.current !== null){
            this.scrollToLatestMessage();
        }
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
                if(this.state.isLoading)
                    this.setState({isLoading: false});

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
        let lastMessageOnClientSide = 0;
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
                    this.checkIfUserIsReadingPreviousMessages();
                    this.setState({ chatContent: receivedJson})
                }
            })
    }


    renderChatRoomContent(){
        if(this.state.isLoading)
            return (
                <div>
                    <Progress animated color="purple" value="100"/>
                </div>
            )
        
        if(this.notEmpty(this.state.chatContent)){
            return this.state.chatContent.map((chatContent) => 

            <div key={chatContent.id} id="message" className="chat-room-message" ref={this.latestMessageRef}>
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
            return <div className="flex-row">
                <div className="flex-row owl-text">
                    Its kinda quite in here
                </div>
            </div>
        }
    }

    notEmpty(array){
        return typeof array !== undefined && array !== [];
    }

    /*
     *  AutoScroll
     */

    scrollToLatestMessage(){
        if(!this.isMessageContainerScrolledToTop){
            const myDomNode = ReactDOM.findDOMNode(this.latestMessageRef.current);
            if(myDomNode !== null)
                myDomNode.scrollIntoView();
        }
    }

    checkIfUserIsReadingPreviousMessages(){
        if(this.messageContainerNode !== null){
            let currentScrollPosition = this.messageContainerNode.scrollTop;
            let totalScrollHeight = this.messageContainerNode.scrollHeight - this.messageContainerNode.clientHeight;

            if(currentScrollPosition < totalScrollHeight)
                this.isMessageContainerScrolledToTop = true;
            else 
                this.isMessageContainerScrolledToTop = false;
        }
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
            <div className="d-flex flex-fill flex-column h-100">
                <div className="containter-fluid chat-room-messages flex-grow-1" ref={this.messageContainerRef}>
                    {this.renderChatRoomContent()}
                </div>
                <div class="containter-fluid">
                    <form onSubmit={this.sendUserMessage}>
                        <input type="message" value={this.state.value} onChange={this.handleChange} class="form-control" placeholder="Insert message..."></input>
                    </form>
                </div>
            </div>
        );
    }
}