import React from 'react';
import './misc/App.css';
import { Container, Row, Col, Navbar, NavbarBrand, Button, Nav, NavItem } from 'reactstrap';
import ChatRoomList from './ChatRoomList';
import ChatRoom from './ChatRoom';
import Authentication from './Authentication';
import AccountRegister from './AccountRegister';



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
    if(this.state.isUserAuthenticated){
      return (
      <div>
        <NavItem>
          <Button color="success" onClick={() => {this.chatRoomList.toggleRoomCreation()}}>Create ChatRoom</Button>
        </NavItem>
        <NavItem>
          Logged as {this.authentication.state.username}
        </NavItem>
      </div>)
    }else{
      return(
        <div>
          <Button color="primary" onClick={() => {this.authentication.toggle()}}>Login</Button>
          <Button color="success" onClick={() => {this.accountRegister.toggle()}}>Register</Button>
        </div>
      )
    }
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
            {this.isUserLogged()}
          </Nav>
      </Navbar>
            
      <Container fluid={true} style={appStyle.appPadding}>
        <Authentication app = {this} ref={instance => {this.authentication = instance}}/>
        <AccountRegister ref={instance => {this.accountRegister = instance}}/>
          <Row>
            <Col sm="4" md="4" lg="4" xl="2">
              <h4>Available Rooms:</h4>
              <ChatRoomList userToken = {this.getUserToken} changeChatRoom={this.changeChatRoom} ref={instance => {this.chatRoomList = instance}}/>
            </Col>
            <Col sm="8" md="8" lg="8" xl="10">
              <h4>Chat:</h4>
              <ChatRoom userToken = {this.getUserToken} ref={instance => {this.chatRoom = instance}}/>
            </Col>
          </Row>
      </Container>
    </div>
    );
  }
}