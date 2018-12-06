import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addChatRoom, updateChatRoom, selectChatRoom } from '../../../redux/actions/ChatRoomActions';
import { socketSubscribe, socketSend } from '../../../redux/actions/SocketActions';
import { fetchUserChatRoomList, subscribeChatRoomListTopic } from './ChatRoomListAPI';
import './ChatRoomListStyle.css';
import ChatRoomEditor from '../editor/ChatRoomEditor';
import ChatRoomCreator from '../creator/ChatRoomCreator';
import ChatRoomJoin from '../join/ChatRoomJoin';
import LogoutButton from '../../logout/LogoutButton';


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
            <div key={chatRoom.id} onClick={() => { this.props.selectChatRoom(chatRoom.id) }} className="room">
                {chatRoom.name}
            </div>
        )
    }

    render() {
        return (
            <div className="h-100 component-background d-flex flex-column">
                <div className="site-logo"><h2>ReactChat</h2></div>
                <h5 className="public-category">Public:</h5>
                <div className="room-list d-flex flex-fill flex-column flex-grow-1">
                    
                    {this.displayList()}
                </div>
                <div className="d-flex flex-shrink-1 button-bar">
                    <ChatRoomCreator />
                    <div className="divider"/>
                    <ChatRoomJoin />
                    <div className="divider"/>
                    <LogoutButton />
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
