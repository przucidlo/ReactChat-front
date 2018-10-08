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
        this.logout = this.logout.bind(this);
        this.handleAPIResponse = this.handleAPIResponse.bind(this);
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

        fetch(config.apiUrl + 'authentication', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'username': this.state.username,
                'password': this.state.password
            })
        }).then(function(response){
            return response.json();
        }).then(receivedJson => {
            this.handleAPIResponse(receivedJson);
        })
    }

    handleAPIResponse(receivedJson){
        console.log(receivedJson);
    }

    /*
                this.toggle();
            this.props.app.setState({isUserAuthenticated: true})
    */

    logout(){
        fetch(config.apiUrl + 'logout', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'token': this.state.token
            })
        })
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
              <ModalHeader toggle={this.toggle}>Authentication</ModalHeader>
              <ModalBody>
                {usernameTakenError}
                <Label for="Authentication">Your username:</Label>
                <Input type="text" name="username" id="usernameInput" placeholder="Insert your username" value={this.state.username} onChange={this.handleUsernameInputChange}/>
                <Input type="password" name="password" id="passwordInput" placeholder="Insert your username" value={this.state.password} onChange={this.handlePasswordInputChange}/>
              </ModalBody>
              <ModalFooter>
                <Form onSubmit={this.authenticate}>
                    <Button color="primary">Login</Button>
                </Form>
              </ModalFooter>
            </Modal>
        </div>
        );
    }
}