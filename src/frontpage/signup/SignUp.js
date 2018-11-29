import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SignUpForm } from './SignUpForm';

export class SignUp extends Component {

    render() {
        return (
            <div>
                <SignUpForm />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
