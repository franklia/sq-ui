import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SchoolIcon from '@material-ui/icons/School';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  logoIcon: {
    fontSize: 60,
    marginTop: 23,
    marginRight: 15,
  },
  logoText: {
    flexGrow: 1,
    fontWeight: 800,
    fontSize: 26,
    marginTop: 38
  },
  navBar: {
    display: 'flex',
    // marginTop: 30,
  },
  navLinks: {
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 18,
    display: 'inline-flex',
    color: theme.palette.secondary.dark,
    textTransform: 'capitalize',
    flexGrow: 0.1,
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
    borderRadius: '8px',
    boxShadow: '0 10px 15px rgba(125,147,178,.3)',
    padding: '8px 40px',
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

    const { classes } = this.props;

    return (
        <div className={classes.navBar}>
          <SchoolIcon color='primary' className={classes.logoIcon}/>
          <h1 className={classes.logoText}>Spot Quiz</h1>
              <NavLink to='/' className={classes.navLinks} exact activeStyle={{color: '#ff5c72'}}>Home</NavLink>
              <NavLink to='/test' className={classes.navLinks} activeStyle={{color: '#ff5c72'}}>Test</NavLink>
              {
                localStorage.isLoggedIn && (
                  <>
                    <NavLink to='/question/create' className={classes.navLinks} activeStyle={{color: '#ff5c72'}}>Add Questions</NavLink>
                    <NavLink to='/questions/index' className={classes.navLinks} activeStyle={{color: '#ff5c72'}}>Manage Questions</NavLink>
                    <Button onClick={this.logout} variant='contained' color="primary" className={classes.button}>Logout</Button>
                  </>
                )
              }
              {
                !localStorage.isLoggedIn && (
                  <>
                    <Button onClick={this.login} variant='contained' color="primary" className={classes.button}>Login / Sign Up</Button>
                  </>
                )
              }
        </div>
      )}};

NavMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavMenu);
