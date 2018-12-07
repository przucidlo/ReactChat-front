import React, { Component } from 'react'
import './ChatRoomStyle.css';
import { connect } from 'react-redux'


class ChatRoomTopBar extends Component {
    constructor(props) {
        super(props);
        this.getFocusedChatRoomDetails = this.getFocusedChatRoomDetails.bind(this);
    }

    getFocusedChatRoomDetails(id) {
        for (let key in this.props.chatRooms) {
            let chatRoom = this.props.chatRooms[key];

            if (chatRoom.id === id) {
                return {
                    'name': chatRoom.name,
                    'description': chatRoom.description
                }
            }
        }
        return null;
    }

    render() {
        const focusedChatRoomDetails = this.getFocusedChatRoomDetails(this.props.focusedChatRoomId);

        if (focusedChatRoomDetails !== null) {
            return (
                <div className="top-bar d-flex flex-fill">
                    <h4 className="top-bar-room-name">{focusedChatRoomDetails.name}</h4>
                    <div className="top-bar-desc">{focusedChatRoomDetails.description}</div>
                </div>
            )
        }


        return (
            <div className="top-bar d-flex flex-fill">

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    chatRooms: state.rooms.chatRooms,
    focusedChatRoomId: state.rooms.focusedChatRoomId
})

export default connect(mapStateToProps)(ChatRoomTopBar);