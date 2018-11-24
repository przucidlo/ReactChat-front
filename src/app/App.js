import React from 'react';
import { connect } from 'react-redux';
import FrontPage from '../frontpage/FrontPage';
import ChatRoomList from './chatroomlist/ChatRoomList';
import {initializeConnection} from '../redux/actions/SocketActions';

class App extends React.Component{
    componentDidUpdate(){
        this.initializeWebSocketAfterAuthentication();
    }

    initializeWebSocketAfterAuthentication(){
        if(this.props.authenticated){
            this.props.initializeConnection();
        }
    }
    
    render(){
        if(!this.props.authenticated)
            return (<FrontPage/>);

            
        return (
            <div>
                <ChatRoomList />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
})

export default connect(mapStateToProps, {initializeConnection})(App);