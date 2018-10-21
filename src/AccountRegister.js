import React from 'react';
import './misc/App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import config from './config/config.json';

export default class AccountRegister extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'username': '',
            'password': '',
            'modal': false,
            'apiResponse': ''
        }

        this.register = this.register.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.clearInputFields = this.clearInputFields.bind(this);
    }
    
    register(event){
        event.preventDefault();

        fetch(config.apiUrl + 'register', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': this.state.username,
                'password': this.state.password
            })
        })
        .then(response => response.json())
        .then(receivedResponse => {
            this.handleApiResponse(receivedResponse);
        })
    }

    handleApiResponse(receivedResponse){
        console.log("Just a test:" + receivedResponse.response);
        if(receivedResponse.response === "REGISTER_SUCCESSFUL"){
            this.clearInputFields();
            this.setState({apiResponse: <Alert color="success">Your account has been created and It's ready to use.</Alert>})
        }else{
            this.setState({apiResponse: <Alert color="danger">{receivedResponse.response}</Alert>})
        }
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

    clearInputFields(){
        this.setState({
            username: '',
            password: ''
        });
    }

    toggle(){
        this.setState({
            modal: !this.state.modal
        })
    }

    render(){
        return (        
        <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle} className="chat-room-list-management">Register</ModalHeader>
              <ModalBody className="chat-room-list-management">
                {this.state.apiResponse}
                <Label for="Authentication">Your username:</Label>
                <Input type="text" name="username" id="usernameInput" placeholder="Insert your username" value={this.state.username} onChange={this.handleUsernameInputChange}/>
                <Label for="Authentication">Your password:</Label>
                <Input type="password" name="password" id="passwordInput" placeholder="Insert your password" value={this.state.password} onChange={this.handlePasswordInputChange}/>
              </ModalBody>
              <ModalFooter className="chat-room-list-management">
                <Form onSubmit={this.register}>
                    <Button color="primary">Register</Button>
                </Form>
              </ModalFooter>
            </Modal>
        </div>
        )
    }
}