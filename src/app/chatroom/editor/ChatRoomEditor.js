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
                <ChatRoomEditorModal ref='modal' chatRoomId={this.props.chatRoomId}/>
                <button type="button" class="btn btn-primary" onClick={() => { this.refs.modal.getWrappedInstance().toggle() }}>Edit</button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    chatRoomId: ownProps.chatRoomId
})

export default connect(mapStateToProps)(ChatRoomEditor);
