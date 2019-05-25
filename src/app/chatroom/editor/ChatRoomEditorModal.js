import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { editChatRoom } from './ChatRoomEditorAPI';

class ChatRoomEditorModal extends Component {
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
        this.editChatRoom = this.editChatRoom.bind(this);
    }

    componentDidMount() {
        this.setFieldsValue();
    }

    /**
     * Data manipulation/API calls
     */

    editChatRoom() {
        editChatRoom(this.props.chatRoomId, this.state.nameInput, this.state.descInput).then(jsonResponse => {
            this.handleResponseFromAPI(jsonResponse);
        });
    }

    setFieldsValue() {
        let chatRoomDetails = this.getChatRoomDetails();
        this.setState({
            nameInput: chatRoomDetails.name,
            descInput: chatRoomDetails.description
        })
    }

    getChatRoomDetails() {
        for (let chatRoom of this.props.chatRooms) {
            if (chatRoom.id === this.props.chatRoomId) {
                return chatRoom;
            }
        }
    }

    handleResponseFromAPI(jsonResponse) {
        switch (jsonResponse.response) {
            case "INSUFFICIENT_RIGHTS":
                this.setAlert('warning', "It seems that you don't have right to do that.");
                break;
            case "CHAT_ROOM_NAME_TAKEN":
                this.setAlert('warning', "Well this name is already taken, think about something else.");
                break;
            case "CANT_UPDATE_CHAT_ROOM_THAT_DOESNT_EXIST":
                this.setAlert('warning', "Are you trying to edit a room that doesn't exist?");
                break;
            case "CHAT_ROOM_UPDATED_SUCCESSFULLY":
                this.setAlert('success', "ChatRoom has been edited successfully");
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
        this.clearAlert();
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

    setAlert(type, message) {
        const alertClass = 'alert alert-' + type;
        this.setState({
            alert: <div className={alertClass} role='alert'>{message}</div>
        })
    }

    clearAlert(){
        this.setState({
            alert: ''
        })
    }

    render() {
        const alert = this.state.alert;

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit ChatRoom</ModalHeader>
                    <ModalBody>
                        {alert}
                        <label>Name:</label>
                        <input type="text" className="form-control" value={this.state.nameInput} onChange={this.handleNameInput} />
                        <label>Description:</label>
                        <input type="text" className="form-control" value={this.state.descInput} onChange={this.handleDescInput} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.editChatRoom}>Edit</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    chatRooms: state.rooms.chatRooms,
    chatRoomId: ownProps.chatRoomId
})

export default connect(mapStateToProps, null, null, { withRef: true })(ChatRoomEditorModal);