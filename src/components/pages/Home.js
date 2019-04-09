import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class Home extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
      <Button
        onClick={this.login.bind(this)}
      >
        Log In
      </Button>


      <Button
        onClick={this.logout.bind(this)}
      >
        Log Out
      </Button>

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
