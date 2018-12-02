import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from 'react-redux';


class ChatRoomEditorModal extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({
            modal: !this.state.modal
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
                        <Button color="primary" onClick={this.createChatRoom}>Edit</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    chatRooms: state.rooms.chatRooms
})

export default connect(mapStateToProps, null, null, {withRef: true})(ChatRoomEditorModal);