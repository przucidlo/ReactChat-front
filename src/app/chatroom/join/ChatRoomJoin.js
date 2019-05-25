import React, { Component } from 'react'
import './ChatRoomJoinStyle.css';
import ChatRoomJoinModal from './ChatRoomJoinModal';
import {connect} from 'react-redux';

class ChatRoomJoin extends Component {
  render() {
    return (
      <div>
        <ChatRoomJoinModal ref='modal' />
        <button type="button" class="btn-sml btn-success join-button" onClick={() => { this.refs.modal.getWrappedInstance().toggle() }}>Join</button>
      </div>
    )
  }
}

export default connect()(ChatRoomJoin);