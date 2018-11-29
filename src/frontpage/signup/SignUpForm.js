import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class SignUpForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.performSignUp = this.performSignUp.bind(this);
    }

    /*
     *  SignUp process.
     */

    performSignUp(){

    }


    /*
     *  Forms event handling.
     */

    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    render(){
        return(
            <form className="form-size">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsernameChange}/>
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange}/>
                    <br />
                    <button type="button" className="btn btn-secondary" onClick={this.performSignUp} >SignUp</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
