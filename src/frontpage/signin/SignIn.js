import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setAuthStatus} from '../../actions/AuthActions';

class SignIn extends React.Component{
    componentWillMount(){
        console.log("AuthStatus:" + this.props.authenticated);
        this.props.setAuthStatus(true);
    }

    componentDidUpdate(){
        console.log("AuthStatus:" + this.props.authenticated);        
    }

    render(){
        return (
            <div>SignIn component</div>
        );
    }
}

SignIn.propTypes = {
    authenticated: PropTypes.bool,
    setAuthStatus: PropTypes.func
}

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
})

export default connect(mapStateToProps, {setAuthStatus})(SignIn);
