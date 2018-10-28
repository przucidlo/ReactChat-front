import React from 'react';
import './misc/App.css';
import ChatRoomList from './ChatRoomList';
import ChatRoom from './ChatRoom';
import UserProfile from './UserProfile';
import Notifications from './Notifications';
import FrontPage from './FrontPage';
import ChatRoomManager from './ChatRoomManager';
import Cookies from 'js-cookie';
import config from './config/config.json';
import jwt_decode from 'jwt-decode';

export default class Chat extends React.Component {

  constructor(){
    super();
    this.state = {
      isUserAuthenticated: false,
      username: null
    }
    this.chatRoomManager = null;
    this.changeChatRoom = this.changeChatRoom.bind(this);
    this.updateUserAuthentication = this.updateUserAuthentication.bind(this);
  }

  changeChatRoom(id){
    this.chatRoomManager.selectChatRoom(id);
  }

  updateUserAuthentication(isUserAuthenticated){
    this.decodeUsernameFromJwt();
    this.setState({
      isUserAuthenticated: isUserAuthenticated,
      username: this.decodeUsernameFromJwt()
    })
  }

  decodeUsernameFromJwt(){
    let decoded = jwt_decode(Cookies.get('Authorization'));
    return decoded.sub;
  }

  render(){
    if(!this.state.isUserAuthenticated)
      return(
      <div>
        <FrontPage updateUserAuthentication={this.updateUserAuthentication}/>
      </div>);

    return(
      <div className="react-chat bg-dark full-screen">
        <nav class="navbar navbar-dark bg-dark navbar-border">
          <a class="navbar-brand" href="#">React<a class="chat-logo">Chat</a></a>
          <div>
            <UserProfile width="32" height="32" username={this.state.username}/>
            <Notifications/>
          </div>
        </nav>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-2 h-100 left-bar-column remove-padding">
              <ChatRoomList changeChatRoom={this.changeChatRoom} class="h-100"/>
            </div>
            <div class="col-sm-8 col-md-8 col-lg-8 col-xl-10 content-column h-100 remove-padding">
              <ChatRoomManager ref={ref => this.chatRoomManager = ref}class="h-100"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//