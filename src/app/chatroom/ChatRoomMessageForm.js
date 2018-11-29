import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { socketSend } from '../../redux/actions/SocketActions';
import { sendChatMessage } from './ChatRoomAPI';

class ChatRoomMessageForm extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            chatFormInput: ''
        }

        this.handleMessageInput = this.handleMessageInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleMessageInput(event){
        this.setState({chatFormInput: event.target.value});
    }
    
    handleSubmit(event){
        event.preventDefault();

        this.sendMessage();
    }

    sendMessage(){
        sendChatMessage(this.props.socketSend, this.props.focusedChatRoomId, this.state.chatFormInput);

        this.clearMessageInput();
    }

    clearMessageInput(){
        this.setState({chatFormInput: ''});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" value={this.state.chatFormInput} onChange={this.handleMessageInput}/>
                </form>
            </div>
        )
    }
}

ChatRoomMessageForm.propTypes = {
    focusedChatRoomId: PropTypes.number,
    socketSend: PropTypes.func
}

const mapStateToProps = (state) => ({
    focusedChatRoomId: state.rooms.focusedChatRoomId
})

const mapDispatchToProps = {
    socketSend
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomMessageForm)
