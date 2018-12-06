import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { getPublicChatRooms, joinChatRoom } from './ChatRoomJoinAPI';

class ChatRoomJoinModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            alert: '',
            roomList: []
        }
        this.toggle = this.toggle.bind(this);
        this.displayChatRoomList = this.displayChatRoomList.bind(this);
        this.isUserMemberOfThisChatRoom = this.isUserMemberOfThisChatRoom.bind(this);
        this.joinChatRoom = this.joinChatRoom.bind(this);
    }

    /**
     * Data manipulation/API calls
     */

    isUserMemberOfThisChatRoom(id){
        for(let chatRoom of this.props.chatRooms){
            if(chatRoom.id === id)
                return true;
        }
        return false;
    }

    fetchPublicChatRooms() {
        getPublicChatRooms().then(responseJson => {
            this.setState({ roomList: responseJson })
        });
    }

    removePublicChatRoomsFromState() {
        this.setState({ roomList: [] });
    }

    joinChatRoom(id){
        joinChatRoom(id).then(jsonResponse => {
            this.handleResponseFromAPI(jsonResponse);
        })
    }

    handleResponseFromAPI(jsonResponse) {
        switch (jsonResponse.response) {
            case "NO_SUCH_CHAT_ROOM_FIND":
                this.setAlert('danger', "It seems that We couldn't find the ChatRoom you're trying to join.");
                break;
            case "YOU_ARE_ALREADY_MEMBER_OF_THIS_CHANNEL":
                this.setAlert('danger', "You can't join the same ChatRoom twice.");
                break;
            case "SUCCESSFULLY_JOINED_CHAT_ROOM":
                this.setAlert('success', "You successfully joined the ChatRoom, have fun chatting.");
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

        if (this.state.modal) {
            this.removePublicChatRoomsFromState();
        } else {
            this.fetchPublicChatRooms();
        }
    }

    setAlert(type, message) {
        const alertClass = 'alert alert-' + type;
        this.setState({
            alert: <div className={alertClass} role='alert'>{message}</div>
        })
    }

    displayChatRoomList() {
        return (
            <div className="list-group chat-room-list">
                {this.prepareEachChatRoomForDisplay()}
            </div>
        )
    }

    prepareEachChatRoomForDisplay() {
        return this.state.roomList.map((chatRoom) => {
            let isUserMemberOfThisRoom = this.isUserMemberOfThisChatRoom(chatRoom.id); 
            
            if(isUserMemberOfThisRoom)
                return;

            return <a href="#" className="list-group-item list-group-item-action" onClick={() => {this.joinChatRoom(chatRoom.id)}}>{chatRoom.name}</a>
        })
    }

    render() {
        const alert = this.state.alert;

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Join ChatRoom</ModalHeader>
                    <ModalBody>
                        {alert}
                        {this.displayChatRoomList()}
                    </ModalBody>
                    <ModalFooter>
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

export default connect(mapStateToProps, null, null, { withRef: true })(ChatRoomJoinModal);
