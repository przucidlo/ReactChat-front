import React, {Component} from 'react';
import config from './config/config.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import sampleAvatar from './graphics/sample_avatar.png'


export default class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            userId: -1,
            componentWidth: this.props.width,
            componentHeight: this.props.height,
            isUserPreviewOpen: false
        }
        this.toggleUserPreview = this.toggleUserPreview.bind(this);
    }

    toggleUserPreview(){
        this.setState({isUserPreviewOpen: !this.state.isUserPreviewOpen});
    }

    render(){
        return(
            <a>
                <img src={sampleAvatar} class="navbar-avatar" onClick={this.toggleUserPreview}/>
                <div>
                    <Modal isOpen={this.state.isUserPreviewOpen} toggle={this.toggleUserPreview}>
                        <ModalBody>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </Modal>
                </div>
            </a>
        )
    }
}