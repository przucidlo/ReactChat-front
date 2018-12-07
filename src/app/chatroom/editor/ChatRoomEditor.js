import React, { Component } from 'react'
import ChatRoomEditorModal from './ChatRoomEditorModal';
import { connect } from 'react-redux';
import { getUserRoomRight } from './ChatRoomEditorAPI';
import settingIcon from './assets/settings.svg';

class ChatRoomEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserAbleToEdit: false
        }
    }

    componentDidMount() {
        this.checkIfUserIsAbleToEdit();
    }

    checkIfUserIsAbleToEdit() {
        getUserRoomRight(this.props.chatRoomId).then(responseJson => {
            if (responseJson.rightLevel === 'OWNER') {
                this.setState({ isUserAbleToEdit: true });
            }
        })
    }

    render() {
        let editTrigger;
        if (this.state.isUserAbleToEdit)
            editTrigger = <img src={settingIcon} onClick={() => { this.refs.modal.getWrappedInstance().toggle() }} />
        
        return (
            <div className="float-right">
                <ChatRoomEditorModal ref='modal' chatRoomId={this.props.chatRoomId} />
                {editTrigger}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    chatRoomId: ownProps.chatRoomId
})

export default connect(mapStateToProps)(ChatRoomEditor);
