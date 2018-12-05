import React from 'react';
import { connect } from 'react-redux';
import FrontPage from '../frontpage/FrontPage';
import ChatRoomList from './chatroom/list/ChatRoomList';
import { initializeConnection } from '../redux/actions/SocketActions';
import ChatRoom from './chatroom/ChatRoom';
import ChatRoomCreator from './chatroom/creator/ChatRoomCreator';


class App extends React.Component {
    componentDidUpdate() {
        this.initializeWebSocketAfterAuthentication();
    }

    initializeWebSocketAfterAuthentication() {
        if (this.props.authenticated) {
            this.props.initializeConnection();
        }
    }

    render() {
        if (!this.props.authenticated)
            return (<div className="h-100"><FrontPage /></div>);


        return (
            <div className="h-100 container-fluid">
                <div className="row h-100">
                    <div className="col-sm-4 col-md-4 col-lg-4 col-xl-2 h-100 remove-padding fill">
                        <ChatRoomList />
                    </div>
                    <div class="col-sm-8 col-md-8 col-lg-8 col-xl-10 remove-padding h-100">
                        <ChatRoom />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
})

export default connect(mapStateToProps, { initializeConnection })(App);