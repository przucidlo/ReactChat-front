import React, { Component } from 'react'
import { connect } from 'react-redux';
import {userLogout} from '../../redux/actions/AuthActions';
import Cookies from 'js-cookie';

class LogoutButton extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        this.props.userLogout();
        Cookies.remove("Authorization");
        window.location.reload();
    }
    
    render() {
        return (
            <div>
                <button type="button" class="btn btn-secondary logout-button" onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    userLogout
}

export default connect(null, mapDispatchToProps)(LogoutButton);