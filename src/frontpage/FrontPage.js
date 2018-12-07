import React from 'react';
import SignIn from './signin/SignIn';
import SignUp from './signup/SignUp';
import { Navbar, NavbarBrand } from 'reactstrap';
import githubMarkSmall from './assets/GitHub-Mark-32px.png'
import './FrontPage.css';

export default class FrontPage extends React.Component {
  render() {
    return (
      <div className="h-100 d-flex flex-column">
        <Navbar color="light" light>
          <NavbarBrand href="/" className="mr-auto"></NavbarBrand>
          <SignUp />
          <div className="button-spacer" />
          <SignIn />
        </Navbar>
        <div className="d-flex flex-grow-1">
          <div className="d-flex flex-fill justify-content-center align-items-center flex-column text-center">
            <div><h1>ReactChat</h1></div>
            <div>
              is an example project of chat application written
              <br />
              in ReactJS + Redux with Spring on backend.
              <br />
              <a href='https://github.com/abbl/ReactChat-front'><img src={githubMarkSmall}/></a>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

