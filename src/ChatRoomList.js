import React, { Component} from 'react';
import config from './config/config.json';
import {ListGroup, ListGroupItem, InputGroup, InputGroupAddon, Input, Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form} from 'reactstrap';

export default class ChatRoomList extends Component{    
    constructor(props){
        super(props)
        this.state = {
            chatRooms: [],
            modal: false,
            roomName: '',
            roomDesc: '',
            roomCreationError:''
        }

        this.retrieveChatRoomsFromAPI = this.retrieveChatRoomsFromAPI.bind(this);
        this.toggleRoomCreation = this.toggleRoomCreation.bind(this);
        this.createChatRoom = this.createChatRoom.bind(this);
        this.fixRoomName = this.fixRoomName.bind(this);
        this.handleAPIResponse = this.handleAPIResponse.bind(this);
        this.handleRoomName = this.handleRoomName.bind(this);
        this.handleRoomDesc = this.handleRoomDesc.bind(this);
    }

    componentWillMount(){
        this.retrieveChatRoomsFromAPI();
    }

    /*
        Chatroom management
    */

    changeRoom(id){
        this.props.changeChatRoom(id);
    }

    createChatRoom(event){
        event.preventDefault();

        if(this.state.roomName !== ''){
            fetch(config.apiUrl + 'chat/createChatRoom', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials':true,
                    'Access-Control-Allow-Methods':'POST, GET'
                },
                body:JSON.stringify({
                    'token': this.props.userToken(),
                    'roomName': this.fixRoomName(this.state.roomName),
                    'roomDesc': this.state.roomDesc
                })
            }).then(function(response){
                return response.json();
            }).then(receivedJson => {
                this.handleAPIResponse(receivedJson);
            })
        }else{
            this.setState({roomCreationError: <Alert color="danger">Room name can't be empty.</Alert>})
        }
    }

    fixRoomName(roomName){
        if(!roomName.startsWith("#")){
            return '#' + roomName;
        }
        return roomName;
    }

    handleAPIResponse(receivedJson){
        if(receivedJson.response !== "CHAT_ERROR_CHATNAME_TAKEN"){
            this.toggleRoomCreation();
            this.clearInputs();
        }else{
            this.setState({roomCreationError: <Alert color="danger">Room name is already taken.</Alert>})
        }
    }

    /*
     *  Form event handling
     */ 

    handleRoomName(event){
        this.setState({roomName: event.target.value});
    }

    handleRoomDesc(event){
        this.setState({roomDesc: event.target.value});
    }

    clearInputs(){
        this.setState({roomName: ''});
        this.setState({roomDesc: ''});
    }

    /*
        Chatroom display
    */
    retrieveChatRoomsFromAPI(){
        setInterval(() => {
            fetch(config.apiUrl + "chatrooms/public", {
                method: 'GET',
                credentials: 'include'
            })
            .then(function(response){
                return response.json();
            })
            .then(receivedJson => {
                this.setState({ chatRooms: receivedJson});
            })
        }, config.chatRoomListRefreshRate);
        clearInterval()
    }

    renderChatRoomsList(){
        return this.state.chatRooms.map((chatRoom) => 
            <ListGroupItem key={chatRoom.id} tag="button" onClick={() => this.changeRoom(chatRoom.id)} action>{chatRoom.name}</ListGroupItem>
        )
    }

    toggleRoomCreation(){
        this.setState({modal: !this.state.modal});
    }

    render(){
        return(
            <div id="chat-room-list h-100">
                <div class="list-group list-group-dark">
                    <li class="list-group-item list-group-border-bottom">
                        Public
                    </li>
                    <div class="list-elements">
                        <div class="list-group">
                            <li class="list-group-item list-group-border-bottom">
                                #Default
                            </li>
                        </div>
                    </div>
                </div>
                <div class="list-group list-group-dark">
                    <li class="list-group-item list-group-border-bottom">
                        Private
                    </li>
                    <div class="list-elements">
                        <div class="list-group">
                            <li class="list-group-item list-group-border-bottom">
                                #Default
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


/*
                <InputGroup>
                    <InputGroupAddon addonType="prepend">#</InputGroupAddon>
                    <Input placeholder="exampleName"/>
                    <Button color="primary" type="submit">Create</Button>
                </InputGroup>
*/