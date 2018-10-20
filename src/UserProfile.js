import React, {Component} from 'react';
import config from './config/config.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import sampleAvatar from './graphics/sample_avatar.png'


export default class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            userId: -1,
            isUserPreviewOpen: false
        }
        this.toggleUserPreview = this.toggleUserPreview.bind(this);
    }

    toggleUserPreview(){
        this.setState({isUserPreviewOpen: !this.state.isUserPreviewOpen});
    }

    render(){
        return(
            <div className="float-right">
                <img src={sampleAvatar} width={this.props.width} height={this.props.height} class="navbar-avatar" onClick={this.toggleUserPreview}/>
                <div>
                    <Modal className="user-profile" isOpen={this.state.isUserPreviewOpen} toggle={this.toggleUserPreview}>
                        <ModalBody className="user-profile">
                            <img src={sampleAvatar} class="navbar-avatar" width="256" height="256"/>
                            <div class="user-profile-content">
                                <h2>Sample name</h2>
                                <p>Sample desc</p>
                            </div>
                        </ModalBody>
                        <ModalFooter className="user-profile">

                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}