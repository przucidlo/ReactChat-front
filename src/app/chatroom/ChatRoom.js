import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { socketSend, socketSubscribe } from '../../redux/actions/SocketActions';
import { addMessage } from '../../redux/actions/ChatRoomActions';
import { subscribeChatRoom, fetchLastMessages } from './ChatRoomAPI';
import ChatRoomMessageForm from './ChatRoomMessageForm';
import ChatRoomTopBar from './ChatRoomTopBar';
import './ChatRoomStyle.css';
import sampleAvatar from './assets/sample_avatar.png';

class ChatRoom extends Component {
    constructor(props) {
        super(props);

        this.lastChatMessageRef = React.createRef();
        this.messageDivRef = React.createRef();
        this.messageDOM = null;
        this.isMessageContainerScrolledToTop = false;
    }

    componentDidMount() {
        this.messageDOM = ReactDOM.findDOMNode(this.messageDivRef.current);
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props;

        if (oldProps.focusedChatRoomId !== newProps.focusedChatRoomId) {
            subscribeChatRoom(this.props.socketSubscribe, this.props.addMessage, this.props.focusedChatRoomId);


            if (this.getChatRoomMessages(newProps.focusedChatRoomId).length === 0) {
                fetchLastMessages(this.props.socketSend, this.props.focusedChatRoomId);
            }
        }

        if (this.lastChatMessageRef !== null) {
            this.scrollToLastMessage();
        }
    }

    renderMessages() {
        this.checkIfUserIsReadingPreviousMessages();
        
        return this.getChatRoomMessages(this.props.focusedChatRoomId).map((message) => {
            return (
                <div key={message.id} className="chat-message" ref={this.lastChatMessageRef}>
                    <div className="d-flex">
                        <img className="chat-message-avatar" src={sampleAvatar}></img>
                        <div className="chat-message-author">
                            {message.author}
                        </div>
                        <div className="chat-message-date">
                            {message.time}
                        </div>
                    </div>
                    <div className="chat-message-content d-flex align-items-end">
                        {message.content}
                    </div>
                </div>
            )
        })
    }

    getChatRoomMessages(id) {
        for (let key in this.props.chatRooms) {
            let chatRoom = this.props.chatRooms[key];

            if (chatRoom.id === id) {
                return chatRoom.messages;
            }
        }
    }

    /**
     * AutoScroll (I will move it to separate file in future updates.)
     */

    scrollToLastMessage() {
        if (!this.isMessageContainerScrolledToTop) {
            const myDomNode = ReactDOM.findDOMNode(this.lastChatMessageRef.current);
            if (myDomNode !== null)
                myDomNode.scrollIntoView();
        }
    }

    checkIfUserIsReadingPreviousMessages() {
        if (this.messageDOM !== null) {
            let currentScrollPosition = this.messageDOM.scrollTop;
            let totalScrollHeight = this.messageDOM.scrollHeight - this.messageDOM.clientHeight;

            if (currentScrollPosition < totalScrollHeight)
                this.isMessageContainerScrolledToTop = true;
            else
                this.isMessageContainerScrolledToTop = false;
        }
    }


    render() {
        let messages;
        if (this.props.focusedChatRoomId !== null) {
            messages = this.renderMessages();
        }

        return (
            <div className="h-100 d-flex flex-column">
                <div className="flex-fill d-flex">
                    <ChatRoomTopBar />
                </div>

                <div className="h-100 d-flex flex-fill flex-column flex-grow-1 chat-content" ref={this.messageDivRef}>
                    {messages}
                </div>

                <div className="d-flex flex-shrink-1 flex-fill">
                    <ChatRoomMessageForm />
                </div>
            </div>
        )
    }
}

ChatRoom.propTypes = {
    chatRooms: PropTypes.array,
    focusedChatRoomId: PropTypes.number,

    socketSend: PropTypes.func,
    socketSubscribe: PropTypes.func,
    addMessage: PropTypes.func
}

const mapStateToProps = (state) => ({
    chatRooms: state.rooms.chatRooms,
    focusedChatRoomId: state.rooms.focusedChatRoomId
})

const mapDispatchToProps = {
    socketSend, socketSubscribe, addMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
