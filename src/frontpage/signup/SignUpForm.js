import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signUp } from './SignUpAPI';
import { setAuthStatus } from '../../redux/actions/AuthActions';

export class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.performSignUp = this.performSignUp.bind(this);
    }

    /*
     *  SignUp process.
     */

    performSignUp() {
        signUp(this.state.username, this.state.password, this.props.setAuthStatus);
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

SignUpForm.propTypes = {
    setAuthStatus: PropTypes.func
}

const mapDispatchToProps = {
    setAuthStatus
}

export default connect(null, mapDispatchToProps, null, {withRef: true})(SignUpForm)
