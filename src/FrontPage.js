import React from 'react';
import AccountRegister from './AccountRegister'
import Authentication from './Authentication';

export default class FrontPage extends React.Component{
    constructor(props){
        super(props);
        this.accountRegister = React.createRef();
        this.authentication = React.createRef();

        this.openSignUpWindow = this.openSignUpWindow.bind(this);
        this.openSignInWindow = this.openSignInWindow.bind(this);
    }

    openSignUpWindow(){
        this.accountRegister.toggle();
    }

    openSignInWindow(){
        this.authentication.toggle();
    }

    render(){
        return(
            <div class="d-flex front-page flex-column">
                    <AccountRegister ref={(ref) => this.accountRegister = ref}/>
                    <Authentication ref={(ref) => this.authentication = ref}/>
                    <h2>React<a class="chat-logo">Chat</a></h2>
                    An open-source chat.
                    <div class="d-flex flex-row">
                        <button type="button" onClick={this.openSignInWindow}class="btn btn-primary front-page-button">Sign In</button>
                        <div class="divider"/>
                        <button type="button" onClick={this.openSignUpWindow} class="btn btn-primary front-page-button">Sign Up</button>
                    </div>
            </div>
        )
    }
}