import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, IconButton, Grid, Hidden, Menu, MenuItem } from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  logoContainer: {
    marginTop: 9,
    '@media (max-width: 1150px)': {
      paddingRight: '0 !important',
      marginTop: 20,
    },
    '@media (max-width: 960px)': {
      paddingLeft: '100px !important',
    },
    '@media (max-width: 700px)': {
      paddingLeft: '25px !important',
    }
  },
  logoIcon: {
    fontSize: 60,
    marginRight: 15,
    '@media (max-width: 1150px)': {
      fontSize: 48,
    },
    '@media (max-width: 400px)': {
      fontSize: 44,
    }
  },
  logoText: {
    display: 'inline-block',
    fontWeight: 800,
    fontSize: 26,
    position: 'relative',
    bottom: 18,
    '@media (max-width: 1150px)': {
      fontSize: 24,
      bottom: 15,
    },
    '@media (max-width: 600px)': {
      fontSize: 24,
      bottom: 15,
    }
  },
  navBar: {
    display: 'flex',
    marginBottom: 30,
  },
  navLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    '@media (max-width: 1150px)': {
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
    }
  },
  navLinks: {
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 18,
    display: 'inline-flex',
    color: theme.palette.secondary.dark,
    textTransform: 'capitalize',
    margin: '33px 0',
    alignItems: 'center',
    padding: '0 20px',
    '@media (max-width: 1150px)': {
      padding: '0 15px',
    }
  },
  navRightContainer: {
    '@media (max-width: 1150px)': {
      paddingLeft: '0 !important',
    }
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
    marginTop: 18,
    marginRight: 20,
    float: 'right',
    // '@media (max-width: 959px)': {
    //   display: 'none',
    // },
  },
  hamburgerIcon: {
    float: 'right',
    marginTop: 12,
    paddingRight: '100px !important',
    '@media (max-width: 700px)': {
      paddingRight: '0 !important',
    }
  }
});

class NavMenu extends Component {
  constructor(props){
    super(props);

    this.state = {
    anchorEl: null,
  };
  };

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {

    const { classes } = this.props;
    // const { menuOpen } = this.state;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
        <div className={classes.navBar}>
          <Grid
            container
            direction='row'
            alignItems='flex-start'
            justify='center'
            spacing={40}
          >
            <Grid item lg={3} md={3} sm={6} xs={6} className={classes.logoContainer}>
              <div >
                <SchoolIcon color='primary' className={classes.logoIcon}/>
                <h1 className={classes.logoText}>Spot Quiz</h1>
              </div>
            </Grid>
            <Hidden smDown>
              <Grid item lg={6}  className={classes.navLinkContainer}>
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
            </Hidden>
            <Grid item lg={3} md={3} sm={6} xs={6} className={classes.navRightContainer}>
              <Hidden smDown>
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
              </Hidden>
              <Hidden mdUp>
                <div className={classes.hamburgerIcon}>
                  <IconButton
                    onClick={this.handleClick}
                    aria-label="Menu"
                    aria-owns={open ? 'simple-menu' : undefined}
                  >
                     <MenuIcon fontSize="large" color='primary' />
                   </IconButton>
                 <Menu
                   id="simple-menu"
                   anchorEl={anchorEl}
                   // open={Boolean(anchorEl)}
                   open={open}
                   onClose={this.handleClose}
                 >
                   <MenuItem onClick={this.handleClose}>Home</MenuItem>
                   <MenuItem onClick={this.handleClose}>Test</MenuItem>
                   <MenuItem onClick={this.handleClose}>Add Question</MenuItem>
                   <MenuItem onClick={this.handleClose}>Manage Questions</MenuItem>
                   <MenuItem onClick={this.handleClose}>Manage Categories</MenuItem>
                 </Menu>
                </div>
              </Hidden>
            </Grid>
          </Grid>
        </div>
      )}};

NavMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavMenu);
