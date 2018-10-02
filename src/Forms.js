import React, { Component} from 'react';
import config from './config/config.json';
import {Form, FormGroup, Input, Button} from 'reactstrap';

export default class ChatForm extends Component{    
    constructor(props){
        super(props)
        this.state = {value: ''};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();

        fetch(config.apiUrl + '/chat/chatRoom/addNewMessage', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'chatRoomId': this.props.chatRoomId,
                'message': this.state.value
            })
        });
        this.clearInputField();
    }

    clearInputField(){
        this.setState({value: ""});
    }

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input type="text" id="chatMessage" placeholder="Insert your message" value={this.state.value} onChange={this.handleChange}/>
                </FormGroup>
                <Button type="submi">Submit</Button>
            </Form>
        );
    }
}