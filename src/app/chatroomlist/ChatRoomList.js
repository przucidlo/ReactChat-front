import React from 'react';
import {connect} from 'react-redux';
import {addChatRoom, addMessage} from '../../redux/actions/ChatRoomActions';
import {socketSubscribe} from '../../redux/actions/SocketActions';

class ChatRoomList extends React.Component{
    componentWillMount(){
        this.testSubscribe();
    }

    testSubscribe(){
        this.props.socketSubscribe('/user/topic/chatroom/list', (payload) => {
            console.log(payload);
        })
    }

    render(){
        return (
            <div>
                ChatRoomList
            </div>
        );
    }
}

ChatRoomList.propTypes = {
}

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
})

export default connect(mapStateToProps, {addChatRoom, addMessage, socketSubscribe})(ChatRoomList);
