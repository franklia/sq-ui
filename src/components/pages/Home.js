import React, { Component } from 'react';
// import { Button } from '@material-ui/core';

class Home extends Component {

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    // const auth = this.props;
    // console.log('auth.accessToken');
    // console.log(auth.auth.accessToken);
    // console.log(auth);

    return (
      <div>

      {
        !isAuthenticated() && (
          <p>NOT Authenticated</p>
        )
      }

      {
        isAuthenticated() && (
          <p>IS Authenticated</p>
        )
      }
      </div>
    );
  }
}

export default Home;
