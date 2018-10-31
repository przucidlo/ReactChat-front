import React from 'react';
import {Input, Label, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon } from 'reactstrap'
import config from './config/config.json';
import Cookies from 'js-cookie';
import ChatRoom from './ChatRoom.js';

export default class JoinChatRoom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            publicChatRooms: [],
            apiResponse: ''
        }
        
        this.renderChatRoomList = this.renderChatRoomList.bind(this);
        this.joinChatRoom = this.joinChatRoom.bind(this);
    }

    componentDidMount(){
        this.retrievePublicChatRooms();
    }

    /*
     *  API Communication
     */

    retrievePublicChatRooms(){
        fetch(config.apiUrl + 'secure/chatroom/public', {
            headers:{
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            return response.json();
        }).then(responseJson => {
            this.setState({
                publicChatRooms: responseJson
            })
        })
    }

    joinChatRoom(roomId){
        fetch(config.apiUrl + 'secure/chatroom/join', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            },
            body: JSON.stringify({
                'roomId': roomId
            })
        }).then(response => {
            return response.json();
        }).then(responseJson => {
            let alert;
            switch(responseJson.response){
                case "SUCCESSFULLY_JOINED_CHAT_ROOM":
                    alert = <div className="alert alert-success">Successfully joined ChatRoom.</div>
                break;
                case "YOU_ARE_ALREADY_MEMBER_OF_THIS_CHANNEL":
                    alert = <div className="alert alert-warning">Can't join the same ChatRoom twice.</div>
                break;
            }

            this.setState({apiResponse: alert});
        })
    }

    /*
     *  DOM related
     */

    renderChatRoomList(){
        if(this.notEmpty(this.state.publicChatRooms)){
            return this.state.publicChatRooms.map((chatRoom) => 
                <ul class="list-group list-group-border-bottom">
                    <li class="list-group-item" onClick={() => {this.joinChatRoom(chatRoom.id)}}>{chatRoom.name}</li>
                </ul>
            )
        }
        return null;
    }

    notEmpty(array){
        return typeof array !== undefined && array !== [];
    }

    render(){
        return (
            <div>
            <ModalHeader className="user-profile">
                {this.props.returnButton}
                Join Room
            </ModalHeader>
            <ModalBody className="user-profile">
                {this.state.apiResponse}
                <div class="join-chat-room-list list-group-dark">
                    {this.renderChatRoomList()}
                </div>
            </ModalBody>
            <ModalFooter className="user-profile">
            </ModalFooter>                  
            </div>
        )
    }
}