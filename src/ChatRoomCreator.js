import React from 'react';
import {Input, Label, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon } from 'reactstrap'
import config from './config/config.json';
import Cookies from 'js-cookie';

export default class ChatRoomCreator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            roomName: '',
            roomDesc: '',
            roomType: '',
            returnButton: this.props.returnButton,
            errorAlert: ''
        }

        this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
        this.handleRoomDescChange = this.handleRoomDescChange.bind(this);
        this.handleRoomTypePublicChange = this.handleRoomTypePublicChange.bind(this);
        this.handleRoomTypePrivateChange = this.handleRoomTypePrivateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /*
     *  API communication
     */

    sendRoomCreationRequest(){
        if(this.checkIfAllFieldsAreComplete()){
            fetch(config.apiUrl + "secure/chatroom", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': Cookies.get('Authorization')
                },
                body: JSON.stringify({
                    'chatRoomName': this.state.roomName,
                    'chatRoomDesc': this.state.roomDesc,
                    'chatRoomType': this.state.roomType
                })
                
                }).then(response => {
                    return response.json();
                }).then(parsedResponse => {
                    switch(parsedResponse.response){
                        case "CHAT_ROOM_CREATED_SUCCESSFULLY":
                            this.setState({errorAlert: <div className="alert alert-success">ChatRoom has been created.</div>})
                        break;
                        case "CHAT_ROOM_NAME_TAKEN":
                            this.setState({errorAlert: <div className="alert alert-danger">This ChatRoom name is already taken.</div>})
                        break;
                    }
                })
        }else{
            this.setState({errorAlert: <div className="alert alert-danger">Make sure to fill up all fields.</div>});
        }
    }

    checkIfAllFieldsAreComplete(){
        return this.state.roomName !== '' && this.state.roomDesc !== '' && this.state.roomType !== '';
    }

    /*
     *  Input handling
     */

    handleRoomNameChange(event){
        this.setState({roomName: event.target.value});
    }

    handleRoomDescChange(event){
        this.setState({roomDesc: event.target.value});
    }

    handleRoomTypePublicChange(event){
        this.setState({roomType: 'PUBLIC'});
    }

    handleRoomTypePrivateChange(event){
        this.setState({roomType: 'PRIVATE'});
    }

    onSubmit(event){
        this.sendRoomCreationRequest();
    }

    render(){
        return (
            <div>
                <ModalHeader className="chat-room-list-management">
                    {this.props.returnButton}
                    Room Creation
                </ModalHeader>
                <ModalBody className="chat-room-list-management">
                    {this.state.errorAlert}
                    Room name:
                    <InputGroup>
                        <InputGroupAddon addonType="prepend" className="input-group-addon">#</InputGroupAddon>
                        <Input type="text" class="form-control" onChange={this.handleRoomNameChange}/>
                    </InputGroup>
                    Room description:
                    <input type="text" class="form-control" onChange={this.handleRoomDescChange}/>
                    Room type:
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" onChange={this.handleRoomTypePublicChange}/>{' '}
                            Public
                        </Label>
                        <Label check className="chat-room-list-management-checkbox" onChange={this.handleRoomTypePrivateChange}>
                            <Input type="radio" name="radio1" />{' '}
                            Private
                        </Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter className="chat-room-list-management">
                    <button type="button" class="btn btn-primary" onClick={this.onSubmit}>Create Room</button>
                </ModalFooter>  
            </div>
        )
    }
}