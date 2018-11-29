import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignUpForm from './SignUpForm';

export class SignUp extends Component {

    render() {
        return (
            <div>
                <SignUpForm />
            </div>
        )
    }
}

export default connect()(SignUp)
