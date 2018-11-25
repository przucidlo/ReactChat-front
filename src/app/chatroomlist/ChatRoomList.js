import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addChatRoom, updateChatRoom, selectChatRoom} from '../../redux/actions/ChatRoomActions';
import {socketSubscribe, socketSend} from '../../redux/actions/SocketActions';
import {fetchUserChatRoomList, subscribeChatRoomListTopic} from './ChatRoomListAPI';

class ChatRoomList extends React.Component{
    constructor(props){
        super(props);
        this.displayList = this.displayList.bind(this);
        this.getChatRoomList = this.getChatRoomList.bind(this);
    }
    
    componentWillMount(){
        subscribeChatRoomListTopic(this.props.socketSubscribe, this.props.addChatRoom, this.props.updateChatRoom, this.getChatRoomList);
        fetchUserChatRoomList(this.props.socketSend);
    }

    getChatRoomList(){
        return this.props.chatRooms;
    }

    render(){
        return (
            <div>
                {this.displayList()}
            </div>
        );
    }

    displayList(){
        return this.props.chatRooms.map((chatRoom) => 
            <div key={chatRoom.id} onClick={() => { this.props.selectChatRoom(chatRoom.id)}}>
                {chatRoom.name}
            </div>
        )
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

export default connect(mapStateToProps, {addChatRoom, updateChatRoom, selectChatRoom, socketSubscribe, socketSend})(ChatRoomList);
