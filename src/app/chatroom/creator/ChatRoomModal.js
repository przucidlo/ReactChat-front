import React, { Component, forwardRef} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {createChatRoom} from './ChatRoomCreatorAPI';

export default class ChatRoomModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
            nameInput: '',
            descInput: '',
            alert: {}
        }
        this.toggle = this.toggle.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleDescInput = this.handleDescInput.bind(this);
        this.createChatRoom = this.createChatRoom.bind(this);
    }
    
    toggle(){
        this.setState({
            modal: !this.state.modal
        })
        this.cleanInputs();
    }

    handleNameInput(event){
        this.setState({
            nameInput: event.target.value
        })
    }

    handleDescInput(event){
        this.setState({
            descInput: event.target.value
        })
    }

    cleanInputs(){
        this.setState({
            nameInput: '',
            descInput: ''
        })
    }

    createChatRoom(){
        createChatRoom(this.state.nameInput, this.state.descInput);
    }

    render() {
        let alert;

        return (
            <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Create ChatRoom</ModalHeader>
              <ModalBody>
                <label>Name:</label>
                <input type="text" className="form-control" value={this.state.nameInput} onChange={this.handleNameInput}/>
                <label>Description:</label>
                <input type="text" className="form-control" value={this.state.descInput} onChange={this.handleDescInput}/>
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