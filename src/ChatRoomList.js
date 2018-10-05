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
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    'token': this.props.userToken(),
                    'roomName': this.state.roomName,
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
            fetch(config.apiUrl + "chat/getChatRoomList")
            .then(function(response){
                return response.json();
            })
            .then(receivedJson => {
                this.setState({ chatRooms: receivedJson});
            })
        }, config.chatRoomListRefreshRate);
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
        const isAnyChatAvailable = this.state.chatRooms;
        let chatRoomsList;

        if(isAnyChatAvailable && isAnyChatAvailable.length > 0){
            chatRoomsList = this.renderChatRoomsList();
        }else{
            chatRoomsList = <div className="loader"></div>
        }

        return(
            <div id="room-creation-modal">
                <Modal isOpen={this.state.modal} toggle={this.toggleRoomCreation}>
                    <ModalHeader toggle={this.toggleRoomCreation}>Create chatroom</ModalHeader>
                        <ModalBody>
                            {this.state.roomCreationError}
                            <InputGroup>
                                <div>
                                    <Label>Room name:</Label>
                                    <Input type="text" name="roomname" id="roomnameInput" placeholder="Insert your chatroom name" value={this.state.roomName} onChange={this.handleRoomName}/>
                                </div>
                                <div>
                                    <Label>Room description:</Label>
                                    <Input type="text" name="roomdesc" id="roomsecInput" placeholder="Insert your chatroom description" value={this.state.roomDesc} onChange={this.handleRoomDesc}/>
                                </div>
                            </InputGroup>
                            <Form className="App-create-room-button" onSubmit={this.createChatRoom}>
                                <Button color="primary" type="submit">Create</Button>
                            </Form>
                        </ModalBody>
                    <ModalFooter>
                        Keep in mind that we don't take any responsibility for content you post in your chatroom.
                    </ModalFooter>
                </Modal>
                <ListGroup className="App-chatRoomList-size">
                    {chatRoomsList}
                </ListGroup>
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