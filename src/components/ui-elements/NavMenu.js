import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  logoContainer: {
    display: 'table',
    margin: 'auto',
    marginTop: 9,
  },
  logoIcon: {
    fontSize: 60,
    marginRight: 15,
  },
  logoText: {
    display: 'inline-block',
    fontWeight: 800,
    fontSize: 26,
    position: 'relative',
    bottom: 18,
  },
  navBar: {
    display: 'flex',
    marginBottom: 30,
  },
  navLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navLinks: {
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 18,
    display: 'inline-flex',
    color: theme.palette.secondary.dark,
    textTransform: 'capitalize',
    margin: '32px 0',
    alignItems: 'center',
    padding: '0 20px',
  },
  button: {
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 18,
    color: '#fff',
    textTransform: 'capitalize',
    borderRadius: '8px',
    boxShadow: '0 10px 15px rgba(125,147,178,.3)',
    padding: '8px 40px',
    display: 'table',
    margin: 'auto',
    marginTop: 18,
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
          <Grid
            container
            direction='row'
            alignItems='flex-start'
            justify='center'
            spacing={40}
          >
            <Grid item lg={3} className=''>
              <div className={classes.logoContainer}>
                <SchoolIcon color='primary' className={classes.logoIcon}/>
                <h1 className={classes.logoText}>Spot Quiz</h1>
              </div>
            </Grid>
            <Grid item lg={6} className={classes.navLinkContainer}>
              <NavLink to='/' className={classes.navLinks} exact activeStyle={{color: '#ff5c72'}}>Home</NavLink>
              <NavLink to='/test' className={classes.navLinks} activeStyle={{color: '#ff5c72'}}>Test</NavLink>
              {
                localStorage.isLoggedIn && (
                  <>
                    <NavLink to='/question/create' className={classes.navLinks} activeStyle={{color: '#ff5c72'}}>Add Questions</NavLink>
                    <NavLink to='/questions/index' className={classes.navLinks} activeStyle={{color: '#ff5c72'}}>Manage Questions</NavLink>
                  </>
                )
              }
            </Grid>
            <Grid item lg={3} className=''>
              {
                localStorage.isLoggedIn && (
                  <>
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
            </Grid>
          </Grid>
        </div>
      )}};

NavMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavMenu);
