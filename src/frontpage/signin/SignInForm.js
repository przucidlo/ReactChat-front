import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from './SignInAPI';
import './SignIn.css';
import { setAuthStatus } from '../../redux/actions/AuthActions';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.performSignIn = this.performSignIn.bind(this);
    }

    /*
     *  SignIn process.
     */

    performSignIn() {
        signIn(this.state.username, this.state.password, this.props.setAuthStatus);
    }

    /*
     *  Forms event handling.
     */

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div>
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsernameChange} />
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} />
            </div>
        )
    }
}

const mapDispatchToProps = {
    setAuthStatus
}

export default connect(null, mapDispatchToProps, null, { withRef: true })(SignInForm)
