import React from 'react'
import owl from './graphics/owl.svg';
import ChatRoom from './ChatRoom';


export default class ChatRoomManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            previousChatRooms: [],
            selectedChatRoom: null
        }
        this.selectedChatRoomRef = new React.createRef();
        
        this.selectChatRoom = this.selectChatRoom.bind(this);
    }

    selectChatRoom(id){
        this.savePreviousChatRoom();


        this.setState({
            selectedChatRoom: null
        }, () => {
            this.setState({
                selectedChatRoom: <ChatRoom chatRoomId={id}/>
            })
        });
    }

    savePreviousChatRoom(){
        if(this.state.selectedChatRoom != null){
            if(!this.checkIfChatRoomWasSavedBefore()){
                
            }else{
                this.updateSavedChatRoom();
            }
        }
    }

    checkIfChatRoomWasSavedBefore(){

    }

    updateSavedChatRoom(){

    }

    render(){
        if(this.state.selectedChatRoom === null)
            return (
                <div className="d-flex flex-column h-100 owl">
                    <div className="flex-row">
                        <img src={owl} width="156" height="156"/>
                        <div className="flex-row owl-text">
                            Hey, why don't you select a channel?
                        </div>
                        <div className="flex-row owl-text">
                            ~Julius Caesar
                        </div>
                    </div>
                </div>
            )

        return (
            <div className="d-flex h-100">
                {this.state.selectedChatRoom}                
            </div>
        )
    }
}