import React from 'react';
import notification from './graphics/round-notifications-24px.svg';
import { Fade } from 'reactstrap';


export default class Notifications extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isNotificationWindowOpen: false
        }

        this.toggleNotificationWindow = this.toggleNotificationWindow.bind(this);
    }

    toggleNotificationWindow(){
        this.setState({isNotificationWindowOpen: !this.state.isNotificationWindowOpen});
    }

    render(){
        let notificationWindow;
        
        if(this.state.isNotificationWindowOpen){
            notificationWindow = 
            (            
                <div class="notification-window list-group-dark">
                    <ul class="list-group list-group-border-bottom">
                        <li class="list-group-item">Sample notification</li>
                    </ul>
                </div>
            )
        }

        return (
            <div className="float-right">
                <img src={notification} class="navbar-notification-bell" id="notification-bell" onClick={this.toggleNotificationWindow}/>
                {notificationWindow}
            </div>
        )
    }
}