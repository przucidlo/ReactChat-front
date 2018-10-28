import React, {Component} from 'react';
import config from './config/config.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import sampleAvatar from './graphics/sample_avatar.png';
import Cookies from 'js-cookie';

export default class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            isUserPreviewOpen: false,
            username: this.props.username,
            userDescription: null
        }
        this.toggleUserPreview = this.toggleUserPreview.bind(this);
    }

    retrieveUserDetails(){
        fetch(config.apiUrl + "secure/user?username=" + this.state.username, {
            headers:{
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            return response.json();
        }).then(responseJson => {
            this.setUserDetails(responseJson);
        })
    }

    setUserDetails(userJson){
        this.setState({
            username: userJson.username,
            userDescription: userJson.description
        })
    }

    toggleUserPreview(){
        this.retrieveUserDetails();
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
                                <h2>{this.state.username}</h2>
                                <p>{this.state.userDescription}</p>
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