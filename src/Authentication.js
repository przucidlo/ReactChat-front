import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import config from './config/config.json';

export default class Authentication extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            username: '',
            password: '',
            usernameTakenError: false
        };

        this.authenticate = this.authenticate.bind(this);

        this.handleAPIAuthenticationResponse = this.handleAPIAuthenticationResponse.bind(this);
        this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleTakenUsernameError = this.toggleTakenUsernameError.bind(this);
    }

    /*
        Account authentication
    */

    authenticate(event){
        event.preventDefault();

        if(this.checkIfSessionCookieIsPresent()){
            fetch(config.url + "login", {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password
                })
            }).then(function(response){
                return console.log(response);
            })
        }
    }

    checkIfSessionCookieIsPresent(){

        return true;
    }

    restorePreviousAuthentication(sessionId){

    }

    handleAPIAuthenticationResponse(receivedJson){
        console.log(receivedJson);
    }




    /*
        Input handling and other DOM actions
    */

    handleUsernameInputChange(event){
        this.setState({username: event.target.value})
    }

    handlePasswordInputChange(event){
        this.setState({password: event.target.value})
    }

    toggle(){
        this.setState({
            modal: !this.state.modal
        })
    }

    toggleTakenUsernameError(){
        this.setState({
            usernameTakenError: !this.state.usernameTakenError
        })
    }

    render(){
        let usernameTakenError;
        if(this.state.usernameTakenError){
            usernameTakenError = <Alert color="danger">This username is already taken.</Alert>
        }

        return (
        <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader className="chat-room-list-management" toggle={this.toggle}>Authentication</ModalHeader>
              <ModalBody className="chat-room-list-management">
                {usernameTakenError}
                <Label for="Authentication">Your username:</Label>
                <Input type="text" name="username" id="usernameInput" placeholder="Insert your username" value={this.state.username} onChange={this.handleUsernameInputChange}/>
                <Label for="Authentication">Your password:</Label>
                <Input type="password" name="password" id="passwordInput" placeholder="Insert your password" value={this.state.password} onChange={this.handlePasswordInputChange}/>
              </ModalBody>
              <ModalFooter className="chat-room-list-management">
                <Form onSubmit={this.authenticate}>
                    <Button color="primary">Login</Button>
                </Form>
              </ModalFooter>
            </Modal>
        </div>
        );
    }
}