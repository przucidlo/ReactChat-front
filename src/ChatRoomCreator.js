import React from 'react';
import {Input, Label, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default class ChatRoomCreator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            roomName: '',
            roomDesc: '',
            roomType: '',
            returnButton: this.props.returnButton
        }
    }

    render(){
        return (
            <div>
                <ModalHeader className="chat-room-list-management">
                    {this.props.returnButton}
                    Room Creation
                </ModalHeader>
                <ModalBody className="chat-room-list-management">
                    Room name:
                    <input type="text" class="form-control"/>
                    Room description:
                    <input type="text" class="form-control"/>
                    Room type:
                    <FormGroup check >
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Public
                        </Label>
                        <Label check className="chat-room-list-management-checkbox">
                            <Input type="radio" name="radio1" />{' '}
                            Private
                        </Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter className="chat-room-list-management">
                    <button type="button" class="btn btn-primary">Create Room</button>
                </ModalFooter>  
            </div>
        )
    }
}