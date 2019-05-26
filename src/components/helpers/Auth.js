import auth0 from 'auth0-js';
import history from './history';

export default class Auth {
  accessToken;
  idToken;
  expiresAt;
  userProfile;

  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URL,
    responseType: 'token id_token',
    audience: process.env.REACT_APP_AUDIENCE,
    scope: 'openid profile'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // navigate to the test route
    history.replace('/test');
  }

  // renewSession() {
  //   this.auth0.checkSession({}, (err, authResult) => {
  //      if (authResult && authResult.accessToken && authResult.idToken) {
  //        // Originally the line below was recommended but I removed it and added the code below
  //        // this.setSession(authResult);
  //
  //        // Set isLoggedIn flag in localStorage
  //        localStorage.setItem('isLoggedIn', 'true');
  //
  //        // Set the time that the access token will expire at
  //        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
  //        this.accessToken = authResult.accessToken;
  //        this.idToken = authResult.idToken;
  //        this.expiresAt = expiresAt;
  //
  //        // console.log(this.accessToken);
  //        history.replace(window.location.pathname);
  //
  //      } else if (err) {
  //        this.logout();
  //        console.log(err);
  //        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
  //      }
  //   });
  // }

  renewSession(callback) {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {

         // Set isLoggedIn flag in localStorage
         localStorage.setItem('isLoggedIn', 'true');

         // Set the time that the access token will expire at
         let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
         this.accessToken = authResult.accessToken;
         this.idToken = authResult.idToken;
         this.expiresAt = expiresAt;

         history.replace(window.location.pathname);

         callback(this.accessToken);

       } else if (err) {
         this.logout();
         console.log(err);
         alert(`This page was trying to renew its authentication token but has timed out. Please refresh the page.`);
       }
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      returnTo: window.location.origin
    });

    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  getProfile(callback) {
  // getProfile() {

    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      callback(profile);
    });
  }
}
