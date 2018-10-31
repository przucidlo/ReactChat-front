import React from 'react';
import exitIcon from './graphics/exit.svg';
import Cookies from 'js-cookie';

export default class Logout extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);        
    }

    logout(){
        Cookies.remove("Authorization");
        window.location.reload();
    }

    render(){
        return (
            <div className="float-right">
                <img src={exitIcon} class="navbar-logout" onClick={this.logout}/>
            </div>
        )
    }
}