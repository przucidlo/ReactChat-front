import React from 'react';
import './misc/App.css';
import { Container, Row, Col, Navbar, NavbarBrand } from 'reactstrap';
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
    const appStyle = {
      appPadding: {
        padding: 30
      }
    }
    //Some comment for git test
    return(
          <div className="react-chat">
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">ReactChat</NavbarBrand>
            </Navbar>
            
            <Container fluid={true} style={appStyle.appPadding}>
              <Row>
                <Col sm="2">
                  <h3>Available Rooms:</h3>
                  <ChatRoomList changeChatRoom={this.changeChatRoom}/>
                </Col>
                <Col sm="10">
                  <h3>Chat:</h3>
                  <ChatRoom ref={instance => {this.chatRoom = instance}}/>
                </Col>
              </Row>
            </Container>
          </div>
    );
  }
}