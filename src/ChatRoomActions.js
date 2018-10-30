import {Input, Label, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import addCircle from './graphics/add-circle.svg';
import React from 'react';
import returnArrow from './graphics/arrows/return_arrow.svg';
import ChatRoomCreator from './ChatRoomCreator';

export default class ChatRoomActions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isRoomManagerOpen: false,
            onlyCreate: this.props.onlyCreate,
            currentSection: function(){}
        }

        this.toggleRoomManagerWindow = this.toggleRoomManagerWindow.bind(this);
        this.getSelectionSectionDOM = this.getSelectionSectionDOM.bind(this);
        this.getRoomCreationDOM = this.getRoomCreationDOM.bind(this);
        this.getRoomListDOM = this.getRoomListDOM.bind(this);
        this.changeDOM = this.changeDOM.bind(this);
    }

    componentDidMount(){
        if(this.state.onlyCreate){
            this.setState({currentSection: this.getRoomCreationDOM})

        }else{
            this.setState({currentSection: this.getSelectionSectionDOM})
        }
    }

    toggleRoomManagerWindow(){
        this.setState({
            isRoomManagerOpen: !this.state.isRoomManagerOpen
        }, ()=>{
            if(!this.state.onlyCreate)
                this.changeDOM(this.getSelectionSectionDOM);
        })
    }

    changeDOM(target){
        this.setState({currentSection: target});
    }

    /*
     *  HTML/DOM
     */

    getSelectionSectionDOM(){
        return (
            <div>
                <ModalHeader className="user-profile">
                    Chat Room Management
                </ModalHeader>
                <ModalFooter className="user-profile">
                    <button type="button" class="btn btn-primary" onClick={()=>{this.changeDOM(this.getRoomCreationDOM)}}>Create Room</button>
                    <button type="button" class="btn btn-primary" onClick={()=>{this.changeDOM(this.getRoomListDOM)}}>Join Room</button>
                </ModalFooter>                
            </div>
        )
    }

    getRoomCreationDOM(){
        let returnButton;

        if(!this.state.onlyCreate)
            returnButton = <img src={returnArrow} onClick={()=>{this.changeDOM(this.getSelectionSectionDOM)}}/>

        return <ChatRoomCreator returnButton={returnButton}/>
    }

    getRoomListDOM(){
        return(
            <div>
                <ModalHeader className="user-profile">
                <img src={returnArrow} onClick={()=>{this.changeDOM(this.getSelectionSectionDOM)}}/>
                    Join Room
                </ModalHeader>
                <ModalBody className="user-profile">
                    <div class="join-chat-room-list list-group-dark">
                        <ul class="list-group list-group-border-bottom">
                            <li class="list-group-item">Sample notification</li>
                        </ul>
                    </div>
                </ModalBody>
                <ModalFooter className="user-profile">
                </ModalFooter>                  
            </div>
        )
    }

    render(){
        let currentSection = this.state.currentSection;


        return(
            <div class="float-right">
                <img src={addCircle} class="list-group-add-circle" onClick={this.toggleRoomManagerWindow}/>
                
                <Modal className="user-profile" isOpen={this.state.isRoomManagerOpen} toggle={this.toggleRoomManagerWindow} size="md">
                    {currentSection.call()}
                </Modal>
            </div>
        );
    }
}