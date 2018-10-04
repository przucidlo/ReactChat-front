import React from 'react';
import './misc/App.css';
import { Container, Row, Col, Navbar, NavbarBrand, Button, Nav } from 'reactstrap';
import ChatRoomList from './ChatRoomList';
import ChatRoom from './ChatRoom';
import Authentication from './Authentication';



export default class Chat extends React.Component {

  constructor(){
    super();
    this.state = {
      displayUser: <Button color="primary" onClick={() => {this.authentication.toggle()}}>Login</Button>
    }

    this.changeChatRoom = this.changeChatRoom.bind(this);
    this.getUserToken = this.getUserToken.bind(this);
  }

  changeChatRoom(id){
    this.chatRoom.changeChatRoom(id);
  }

  getUserToken(){
    return this.authentication.state.token;
  }

  render(){
  const appStyle = {
      appPadding: {
        padding: 30
    }
  }
  
  return(
          <div className="react-chat">
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">ReactChat</NavbarBrand>
                <Nav className="ml-auto" navbar>
                  {this.state.displayUser}
                </Nav>
            </Navbar>
            
            <Container fluid={true} style={appStyle.appPadding}>
            <Authentication app = {this} ref={instance => {this.authentication = instance}}/>
              <Row>
                <Col sm="2">
                  <h3>Available Rooms:</h3>
                  <ChatRoomList changeChatRoom={this.changeChatRoom}/>
                </Col>
                <Col sm="10">
                  <h3>Chat:</h3>
                  <ChatRoom userToken = {this.getUserToken} ref={instance => {this.chatRoom = instance}}/>
                </Col>
              </Row>
            </Container>
          </div>
    );
  }
}
/**
                  {
                  this.authentication.state.token != '' ? (
                    <h5>this.authentication.state.username</h5>
                  ) : (
                    <Button color="primary" onClick={() => {this.authentication.toggle()}}>Login</Button>
                  )}
**/