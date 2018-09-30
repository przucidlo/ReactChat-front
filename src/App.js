import React, { Component } from 'react';
import './App.css';
import ChatForm from './Forms.js';
import { Button, Container, Row, Col, InputGroupAddon, InputGroup, Input } from 'reactstrap';



export default class Chat extends Component {
  chatMessages = ["First Message", "Test Message", "What the fuck is this"];

  constructor(){
    super();
    this.addNewMessage = this.addNewMessage.bind(this);
  }

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

  render(){
    
    return(
      <div className="react-chat">
        <Container fluid={true}>
          <Row>
            <Col sm="2">
              Available Rooms:
            </Col>
            <Col sm="8">
              Chat:
              {this.loadChatMessages()}
              <ChatForm addNewMessage={this.addNewMessage} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

