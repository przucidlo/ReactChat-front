import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignUpForm from './SignUpForm';
import SignUpModal from './SignUpModal';

export class SignUp extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <SignUpModal ref="modal"/>
                <button type="button" class="btn btn-outline-secondary" onClick={() => { this.refs.modal.getWrappedInstance().toggle()}} >SignUp</button>
            </div>
        )
    }
}

export default connect()(SignUp)
