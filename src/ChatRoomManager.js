import React from 'react'
import owl from './graphics/owl.svg';

export default class ChatRoomManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedChatRoom: null,
            chatRooms: []
        }
    }

    selectChatRoom(id){

    }

    render(){
        if(this.state.selectedChatRoom === null)
            return (
                <div className="d-flex flex-column h-100 owl">
                    <div className="flex-row">
                        <img src={owl} width="156" height="156"/>
                        <div className="flex-row owl-text">
                            Hey why don't you select a channel?
                        </div>
                    </div>
                </div>
            )

        return (
            <div>
                {this.state.selectedChatRoom}                
            </div>
        )
    }
}