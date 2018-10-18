import React, { Component} from 'react';
import config from './config/config.json';
import arrow_up from './graphics/arrows/arrow_up.svg';

export default class ChatRoomList extends Component{    
    constructor(props){
        super(props)
        this.state = {
            publicArrowRotation: 0,
            privateArrowRotation: 0,
            showPublicRooms: true,
            showPrivateRooms: true
        }
        this.hidePublicRooms= this.hidePublicRooms.bind(this);
        this.hidePrivateRooms = this.hidePrivateRooms.bind(this);
        this.getPublicChatRooms = this.getPublicChatRooms.bind(this);
        this.getPrivateChatRooms = this.getPrivateChatRooms.bind(this);
    }

    /*
     *  ChatRoom fetching
     */

    
    getPublicChatRooms(){
        if(this.state.showPublicRooms){
            return (                    
            <div class="list-elements">
                <div class="list-group">
                    <li class="list-group-item list-group-border-bottom">
                        #Default
                    </li>
                </div>
             </div>
            )
        }
    }

    getPrivateChatRooms(){
        if(this.state.showPrivateRooms){
            return (                    
            <div class="list-elements">
                <div class="list-group">
                    <li class="list-group-item list-group-border-bottom">
                        #Default
                    </li>
                </div>
             </div>
            )
        }
    }

    /*
     *  HTML/CSS related
     */

    hidePublicRooms(){
        this.setState({
            publicArrowRotation: this.calculateRotation(this.state.publicArrowRotation),
            showPublicRooms: !this.state.showPublicRooms
        })
    }

    hidePrivateRooms(){
        this.setState({
            privateArrowRotation: this.calculateRotation(this.state.privateArrowRotation),
            showPrivateRooms: !this.state.showPrivateRooms
        })
    }

    calculateRotation(rotation){
        let newRotation = rotation + 180;
        if(newRotation >= 360){
            newRotation = 0;
        }
        return newRotation;
    }

    render(){
        return(
            <div class="chat-room-list h-100">
                <div class="list-group list-group-dark">
                    <li class="list-group-item list-group-border-bottom">
                        Public 
                        <img src={arrow_up} class="list-group-arrow" id="public_arrow" 
                        style={{transform: `rotate(${this.state.publicArrowRotation}deg)`}} onClick={this.hidePublicRooms}/>
                    </li>
                    {this.getPublicChatRooms()}
                </div>
                <div class="list-group list-group-dark">
                    <li class="list-group-item list-group-border-bottom">
                        Private 
                        <img src={arrow_up} class="list-group-arrow" id="private_arrow"
                        style={{transform: `rotate(${this.state.privateArrowRotation}deg)`}} onClick={this.hidePrivateRooms}></img>
                    </li>
                    {this.getPrivateChatRooms()}
                </div>
            </div>
        );
    }
}


/*
                <InputGroup>
                    <InputGroupAddon addonType="prepend">#</InputGroupAddon>
                    <Input placeholder="exampleName"/>
                    <Button color="primary" type="submit">Create</Button>
                </InputGroup>
*/