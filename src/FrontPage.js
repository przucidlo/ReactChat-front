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
            <div className="d-flex front-page flex-column">
                    <AccountRegister ref={(ref) => this.accountRegister = ref}/>
                    <Authentication updateUserAuthentication={this.props.updateUserAuthentication} ref={(ref) => this.authentication = ref}/>
                    <h2>React<a className="chat-logo">Chat</a></h2>
                    <br />
                    (Please note that this is a stress test release, some functions might be yet to implement.
                    <br />
                    If you occur any bug, please report it to me on Discord DM, Bbl#3361)
                    <div className="d-flex flex-row">
                        <button type="button" onClick={this.openSignInWindow} className="btn btn-primary front-page-button">Sign In</button>
                        <div className="divider"/>
                        <button type="button" onClick={this.openSignUpWindow} className="btn btn-primary front-page-button">Sign Up</button>
                    </div>
            </div>
        )
    }
}