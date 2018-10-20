import React from 'react';
import './misc/App.css';
import ChatRoomList from './ChatRoomList';
import ChatRoom from './ChatRoom';
import UserProfile from './UserProfile';
import Notifications from './Notifications';
import FrontPage from './FrontPage';


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
    if(!this.state.isUserAuthenticated)
      return(
      <div>
        <FrontPage/>
      </div>);

    return(
      <div className="react-chat bg-dark full-screen">
        <nav class="navbar navbar-dark bg-dark navbar-border">
          <a class="navbar-brand" href="#">React<a class="chat-logo">Chat</a></a>
          <div>
            <UserProfile width="32" height="32"/>
            <Notifications/>
          </div>
        </nav>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-2 h-100 left-bar-column remove-padding">
              <ChatRoomList class="h-100"/>
            </div>
            <div class="col-sm-8 col-md-8 col-lg-8 col-xl-10 content-column h-100 remove-padding">
              <ChatRoom class="h-100"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//