import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addChatRoom, updateChatRoom, selectChatRoom } from '../../../redux/actions/ChatRoomActions';
import { socketSubscribe, socketSend } from '../../../redux/actions/SocketActions';
import { fetchUserChatRoomList, subscribeChatRoomListTopic } from './ChatRoomListAPI';
import './ChatRoomListStyle.css';
import ChatRoomEditor from '../editor/ChatRoomEditor';


class ChatRoomList extends React.Component {
    constructor(props) {
        super(props);
        this.displayList = this.displayList.bind(this);
        this.getChatRoomList = this.getChatRoomList.bind(this);
    }

    componentWillMount() {
        subscribeChatRoomListTopic(this.props.socketSubscribe, this.props.addChatRoom, this.props.updateChatRoom, this.getChatRoomList);
        fetchUserChatRoomList(this.props.socketSend);
    }

    getChatRoomList() {
        return this.props.chatRooms;
    }

    displayList() {
        return this.props.chatRooms.map((chatRoom) =>
            <a onClick={() => { this.props.selectChatRoom(chatRoom.id) }} className="list-group-item list-group-item-action">{chatRoom.name}</a>
        )
    }

    render() {
        return (
            <div className="h-100 component-background">
                <div className="list-group">
                    {this.displayList()}
                </div>
            </div>
        );
    }
}

ChatRoomList.propTypes = {
    chatRooms: PropTypes.array,
    addChatRoom: PropTypes.func,
    updateChatRoom: PropTypes.func,
    socketSubscribe: PropTypes.func,
    socketSend: PropTypes.func
}

const mapStateToProps = state => ({
    chatRooms: state.rooms.chatRooms
})

export default connect(mapStateToProps, { addChatRoom, updateChatRoom, selectChatRoom, socketSubscribe, socketSend })(ChatRoomList);
