import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Auth from './helpers/Auth';
// import history from './helpers/history';
import Button from '@material-ui/core/Button';
import SchoolIcon from '@material-ui/icons/School';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
    fontWeight: 800,
  },
  navBar: {
    display: 'flex',
  },
  navLinks: {
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 18,
    display: 'inline-flex',
    color: theme.palette.secondary.dark,
    textTransform: 'capitalize',
    flexGrow: 0.05,
    margin: '32px 0',
    alignItems: 'center',
  },
  button: {
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 18,
    display: 'inline-flex',
    color: '#fff',
    textTransform: 'capitalize',
    marginTop: 32,
    marginBottom: 32,
  },
  schoolIcon: {
    fontSize: 60,
    marginTop: 23,
    marginRight: 15,
  }
});

class NavMenu extends Component {

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  render() {

    const { classes, auth } = this.props;

    return (
        <div className={classes.navBar}>
          <SchoolIcon color='primary' className={classes.schoolIcon}/>
          <h1 className={classes.logo}>Spot Quiz</h1>
              <Link to={{ pathname: '/', authResult: auth.authResult }} className={classes.navLinks}>Home</Link>
              <Link to={{ pathname: '/test', authResult: auth.authResult }} className={classes.navLinks}>Test</Link>
              {
                localStorage.isLoggedIn && (
                  <>
                    <Link to={{ pathname: '/question/create', authResult: auth.authResult }} className={classes.navLinks}>Add Question</Link>
                    <Link to={{ pathname: '/questions/index', authResult: auth.authResult }} className={classes.navLinks}>View All</Link>
                    <Button onClick={this.logout} variant='contained' color="primary" className={classes.button}>Logout</Button>
                  </>
                )
              }
              {
                !localStorage.isLoggedIn && (
                  <>
                    <Button onClick={this.login} variant='contained' color="primary" className={classes.button}>Login or Sign Up</Button>
                  </>
                )
              }
        </div>
      )}};

NavMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavMenu);
