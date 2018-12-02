import React, { Component, useRef } from 'react'
import ChatRoomModal from './ChatRoomModal';

export default class ChatRoomCreator extends Component {

  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  render() {
    return (
      <div>
        <ChatRoomModal ref={this.childRef} />
        <button type="button" class="btn btn-primary" onClick={() => { this.childRef.current.toggle() }}>Create ChatRoom</button>
      </div>
    )
  }
}
