import React, { Component } from 'react'
import ChatRoomEditorModal from './ChatRoomEditorModal';
import {connect} from 'react-redux';

class ChatRoomEditor extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div>
                <ChatRoomEditorModal ref='modal' chatRooomId={this.props.chatRooomId}/>
                <button type="button" class="btn btn-primary" onClick={() => { this.refs.modal.getWrappedInstance().toggle() }}>Edit</button>
            </div>
        )
    }
}

export default connect()(ChatRoomEditor);
