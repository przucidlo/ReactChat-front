import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setAuthStatus} from '../../redux/actions/AuthActions';
import {checkIfTokenIsValid} from './SignInAPI';
import SignInForm from './SignInForm';


class SignIn extends React.Component{
    componentWillMount(){
        this.authenticateUsingCookies();
    }

    authenticateUsingCookies(){
        checkIfTokenIsValid().then(status => {
            if(status)
                this.props.setAuthStatus(true);
        })
    }

    render(){
        return (
            <div>
                <SignInForm/>
            </div>
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
