import React, { Component } from 'react';
import ConfirmUserCredentials from '../helpers/ConfirmUserCredentials.js';

class Home extends Component {

  componentDidMount = () => {
    const { auth } = this.props;
    ConfirmUserCredentials(auth, this.setAuth0Id, () => {});
  }

  setAuth0Id = id => {
    this.setState({ auth0_id: id })
  }

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
