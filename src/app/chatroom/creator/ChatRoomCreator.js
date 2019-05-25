import React, { Component} from 'react'
import ChatRoomModal from './ChatRoomModal';

export default class ChatRoomCreator extends Component {

  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }

  render() {
    return (
      <div>
        <ChatRoomModal ref={this.modalRef} chatRoomId={this.props.chatRoomId}/>
        
        <button type="button" class="btn-sml btn-primary" onClick={() => { this.modalRef.current.toggle() }}>Create</button>
      </div>
    )
  }
}
