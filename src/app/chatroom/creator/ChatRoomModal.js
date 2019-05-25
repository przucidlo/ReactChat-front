import React, { Component, forwardRef } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { createChatRoom } from './ChatRoomCreatorAPI';

export default class ChatRoomModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            nameInput: '',
            descInput: '',
            alert: ''
        }
        this.toggle = this.toggle.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleDescInput = this.handleDescInput.bind(this);
        this.createChatRoom = this.createChatRoom.bind(this);
    }

    createChatRoom() {
        createChatRoom(this.state.nameInput, this.state.descInput).then(jsonResponse => {
            this.handleResponseFromAPI(jsonResponse);
        });
    }

    handleResponseFromAPI(jsonResponse) {
        switch (jsonResponse.response) {
            case "CHAT_ROOM_NAME_TAKEN":
                this.setAlert('warning', "Well this name is already taken, think about something else.");
                break;
            case "CHAT_ROOM_CREATED_SUCCESSFULLY":
                this.setAlert('success', "ChatRoom has been created successfully");
                break;
            case "MISSING_CHAT_ROOM_CREDENTIALS":
                this.setAlert('danger', "Please fill up all the fields");
                break;
        }
    }

    /**
     * DOM related
     */

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
        this.cleanInputs();
    }

    handleNameInput(event) {
        this.setState({
            nameInput: event.target.value
        })
    }

    handleDescInput(event) {
        this.setState({
            descInput: event.target.value
        })
    }

    cleanInputs() {
        this.setState({
            nameInput: '',
            descInput: '',
            alert: ''
        })
    }

    setAlert(type, message) {
        const alertClass = 'alert alert-' + type;
        this.setState({
            alert: <div className={alertClass} role='alert'>{message}</div>
        })
    }

    render() {
        const alert = this.state.alert;

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create ChatRoom</ModalHeader>
                    <ModalBody>
                        {alert}
                        <label>Name:</label>
                        <input type="text" className="form-control" value={this.state.nameInput} onChange={this.handleNameInput} />
                        <label>Description:</label>
                        <input type="text" className="form-control" value={this.state.descInput} onChange={this.handleDescInput} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createChatRoom}>Create</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}