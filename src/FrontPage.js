import React from 'react';

export default class FrontPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="d-flex front-page flex-column">
                    <h2>React<a class="chat-logo">Chat</a></h2>
                    An open-source chat.
                    <div class="d-flex flex-row">
                        <button type="button" class="btn btn-primary front-page-button">Sign In</button>
                        <div class="divider"/>
                        <button type="button" class="btn btn-primary front-page-button">Sign Up</button>
                    </div>
            </div>
        )
    }
}