import React from 'react';
import './misc/App.css';
//import ChatForm from './Forms.js';
import { Container, Row, Col } from 'reactstrap';
import ChatRooms from './ChatRooms';



export default class Chat extends React.Component {

  render(){
    
    return(
      <div className="react-chat">
        <Container fluid={true}>
          <Row>
            <Col sm="2">
              <h3>Available Rooms:</h3>
              <ChatRooms/>
            </Col>
            <Col sm="8">
            <h3>Chat:</h3>
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