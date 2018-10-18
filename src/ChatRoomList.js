import React, { Component} from 'react';
import config from './config/config.json';
import arrow_up from './graphics/arrows/arrow_up.svg';

export default class ChatRoomList extends Component{    
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div class="chat-room-list h-100">
                <div class="list-group list-group-dark">
                    <li class="list-group-item list-group-border-bottom">
                        Public 
                        <img src={arrow_up} class="list-group-arrow"></img>
                    </li>
                    <div class="list-elements" id="public">
                        <div class="list-group">
                            <li class="list-group-item list-group-border-bottom">
                                #Default
                            </li>
                        </div>
                    </div>
                </div>
                <div class="list-group list-group-dark">
                    <li class="list-group-item list-group-border-bottom">
                        Private 
                        <img src={arrow_up} class="list-group-arrow"></img>
                    </li>
                    <div class="list-elements" id="private">
                        <div class="list-group">
                            <li class="list-group-item list-group-border-bottom">
                                #Default
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


/*
                <InputGroup>
                    <InputGroupAddon addonType="prepend">#</InputGroupAddon>
                    <Input placeholder="exampleName"/>
                    <Button color="primary" type="submit">Create</Button>
                </InputGroup>
*/