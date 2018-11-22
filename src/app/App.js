import React from 'react';
import { connect } from 'react-redux';
import FrontPage from '../frontpage/FrontPage';

class App extends React.Component{
    render(){
        if(!this.props.authenticated)
            return (<FrontPage/>);

            
        return (
            <div>
                abcd
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
})

export default connect(mapStateToProps, {})(App);