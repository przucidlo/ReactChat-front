import React from 'react';
import './misc/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatRoomList from './ChatRoomList';
import ChatRoom from './ChatRoom';
import Authentication from './Authentication';



export default class Chat extends React.Component {

  constructor(){
    super();
    this.state = {
      isUserAuthenticated: false 
    }

    this.changeChatRoom = this.changeChatRoom.bind(this);
    this.getUserToken = this.getUserToken.bind(this);
    this.isUserLogged = this.isUserLogged.bind(this);
  }

  changeChatRoom(id){
    this.chatRoom.changeChatRoom(id);
  }

  getUserToken(){
    return this.authentication.state.token;
  }

  isUserLogged(){

  }

  render(){
  const appStyle = {
      appPadding: {
        padding: 30
    }
  }
  
  return(
    <div className="react-chat bg-dark">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-border">
        <a class="navbar-brand" href="#">React<a class="chat-logo">Chat</a></a>
      </nav>
    </div>
    );
  }
}