import React, { Component } from 'react'
import SignUpForm from './SignUpForm';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from 'react-redux';

class SignUpModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>SignUp</ModalHeader>
                    <ModalBody>
                        <SignUpForm ref="signUpForm"/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {this.refs.signUpForm.getWrappedInstance().performSignUp()}}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(null, null, null, {withRef: true})(SignUpModal)
