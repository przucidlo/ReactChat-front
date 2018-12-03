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
            descInput: ''
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
        editChatRoom(this.props.chatRoomId, this.state.nameInput, this.state.descInput);
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

    /**
     * DOM related
     */

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
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

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit ChatRoom</ModalHeader>
                    <ModalBody>
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