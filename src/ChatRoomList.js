import React, { Component} from 'react';
import config from './config/config.json';
import arrowUp from './graphics/arrows/arrow_up.svg';
import addCircle from './graphics/add-circle.svg';
import ChatRoomActions from './ChatRoomActions';
import Cookies from 'js-cookie'

export default class ChatRoomList extends Component{    
    constructor(props){
        super(props)
        this.state = {
            publicArrowRotation: 0,
            privateArrowRotation: 0,
            showPublicRooms: true,
            showPrivateRooms: true,
            publicRooms: [],
            privateRooms: []
        }

        this.fetchUserChatRooms = this.fetchUserChatRooms.bind(this);
        this.sortChatRooms = this.sortChatRooms.bind(this);
        this.hidePublicRooms= this.hidePublicRooms.bind(this);
        this.hidePrivateRooms = this.hidePrivateRooms.bind(this);
        this.getPublicChatRooms = this.getPublicChatRooms.bind(this);
        this.getPrivateChatRooms = this.getPrivateChatRooms.bind(this);
        this.preparePublicRoomList = this.preparePublicRoomList.bind(this);
        this.preparePrivateRoomList = this.preparePrivateRoomList.bind(this);
    }

    componentDidMount(){
        this.fetchUserChatRooms();
    }

    /*
     *  ChatRoom fetching
     */

    fetchUserChatRooms(){
        let interval = setInterval(() => {
            fetch(config.apiUrl + "secure/chatroom", {
                method: 'GET',
                headers:{
                    'Authorization': Cookies.get('Authorization')
                }
            }).then(response => {
                return response.json();
            }).then(json => {
                this.sortChatRooms(json);
            })
        }, config.chatRoomListRefreshRate);
    }
    
    sortChatRooms(unsortedChatRooms){
        let publicRooms = [];
        let privateRooms = [];
        
        unsortedChatRooms.map((chatRoom) => {
            switch(chatRoom.type){
                case 'PUBLIC':
                    publicRooms.push(chatRoom)
                    break;
                case 'PRIVATE':
                    privateRooms.push(chatRoom)
                    break;
            }
        })

        this.setState({
            publicRooms: publicRooms,
            privateRooms: privateRooms
        })
    }

    /*
     *  HTML/CSS related
     */

    getPublicChatRooms(){
        if(this.state.showPublicRooms){
            return (                    
            <div class="list-elements">
                <div class="list-group">
                    {this.preparePublicRoomList()}
                </div>
             </div>
            )
        }
    }

    preparePublicRoomList(){
        return this.state.publicRooms.map((publicRoom) => 
            <li key={publicRoom.id} class="list-group-item list-group-border-bottom" onClick={() => {this.props.changeChatRoom(publicRoom.id)}}>
                {publicRoom.name}
            </li>
        )
    }

    getPrivateChatRooms(){
        if(this.state.showPrivateRooms){
            return (                    
            <div class="list-elements">
                <div class="list-group">
                    {this.preparePrivateRoomList()}
                </div>
             </div>
            )
        }
    }

    preparePrivateRoomList(){
        return this.state.privateRooms.map((privateRoom) => 
            <li key={privateRoom.id} class="list-group-item list-group-border-bottom" onClick={() => {this.props.changeChatRoom(privateRoom.id)}}>
                {privateRoom.name}
            </li>
        )
    }

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
                        <img src={arrowUp} class="list-group-arrow" id="public_arrow" 
                        style={{transform: `rotate(${this.state.publicArrowRotation}deg)`}} onClick={this.hidePublicRooms}/>
                        <ChatRoomActions/>
                    </li>
                    {this.getPublicChatRooms()}
                </div>
                <div class="list-group list-group-dark">
                    <li class="list-group-item list-group-border-bottom">
                        Private 
                        <img src={arrowUp} class="list-group-arrow" id="private_arrow"
                        style={{transform: `rotate(${this.state.privateArrowRotation}deg)`}} onClick={this.hidePrivateRooms}></img>
                        <ChatRoomActions onlyCreate={true}/>
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