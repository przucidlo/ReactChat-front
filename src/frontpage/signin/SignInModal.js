import React, { Component } from 'react'
import SignInForm from './SignInForm';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from 'react-redux';

class SignInModal extends Component {
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
                    <ModalHeader toggle={this.toggle}>SignIn</ModalHeader>
                    <ModalBody>
                        <SignInForm ref="signInForm"/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {this.refs.signInForm.getWrappedInstance().performSignIn()}}>SignIn</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(null, null, null, {withRef: true})(SignInModal)