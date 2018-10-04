import React, { Component} from 'react';
import config from './config/config.json';
import {Alert, Form, FormGroup, Input, Button} from 'reactstrap';
import './misc/App.css';

export default class ChatRoom extends Component{    
    constructor(props){
        super(props)
        
        this.doesUserUsedScroll = false
        this.state = {
            chatRoomId: -1,
            chatContent: [],
            interval : null,
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendUserMessage = this.sendUserMessage.bind(this);
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
            fetch(config.apiUrl + "chat/chatRoom/getRecentMessages?id=" + this.state.chatRoomId)
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
        if(this.chatContentDiv.scrollTop !== this.chatContentDiv.scrollHeight + this.chatContentDiv.clientHeight){
            this.doesUserUsedScroll = true;
        }else{
            this.doesUserUsedScroll = false;
        }
    }

    renderChatRoomContent(){
        if(this.notEmpty(this.state.chatContent)){
            return this.state.chatContent.map((chatContent) => 
                <p key={chatContent.id}>{chatContent.timeStamp}|{chatContent.sender}: {chatContent.message}</p>
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
                <div ref={div => {this.chatContentDiv = div;}} style={divStyle}>
                    {chatContent}
                </div>
                
                <Form onSubmit={this.sendUserMessage}>
                    <FormGroup>
                        <Input type="text" id="chatMessage" placeholder="Insert your message" value={this.state.value} onChange={this.handleChange}/>
                    </FormGroup>
                    <Button type="submi">Submit</Button>
                </Form>
            </div>
        );
    }
}