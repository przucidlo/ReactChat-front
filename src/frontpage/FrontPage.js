import React from 'react';
import SignIn from './signin/SignIn';
import SignUp  from './signup/SignUp';

export default class FrontPage extends React.Component {
  render(){
    return(
      <div>
        <SignIn />
        <SignUp />
      </div>
    )
  }
}
