import React from 'react';
import './misc/App.css';
//import ChatForm from './Forms.js';
import { Container, Row, Col } from 'reactstrap';
import ChatRoomList from './ChatRoomList';
import ChatRoom from './ChatRoom';



export default class Chat extends React.Component {

  constructor(){
    super();

    this.changeChatRoom = this.changeChatRoom.bind(this);
  }

  changeChatRoom(id){
    this.chatRoom.changeChatRoom(id);
  }

  render(){
    
    return(
      <div className="react-chat">
        <Container fluid={true}>
          <Row>
            <Col sm="2">
              <h3>Available Rooms:</h3>
              <ChatRoomList changeChatRoom={this.changeChatRoom}/>
            </Col>
            <Col sm="8">
              <h3>Chat:</h3>
              <ChatRoom ref={instance => {this.chatRoom = instance}}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

/**
 * 
  loadChatMessages(){
    console.log("Test");
    return this.chatMessages.map((message) => 
      <p>{message}</p>
    );
  }

  sendMessage(){
  }

  addNewMessage(message){
    this.chatMessages.push(message);
    this.forceUpdate();
    console.log(this.chatMessages);
  }
 */