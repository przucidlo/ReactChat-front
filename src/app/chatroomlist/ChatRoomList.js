import React from 'react';
import {connect} from 'react-redux';
import {addChatRoom, addMessage} from '../../redux/actions/ChatRoomActions';


class ChatRoomList extends React.Component{
    componentWillMount(){

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
})

export default connect(mapStateToProps, {addChatRoom, addMessage})(ChatRoomList);
