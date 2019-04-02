import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
    fontWeight: 800,
  },
  navLinks: {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 400,
    fontSize: 16,
  }
};

function NavMenu(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit" className={classes.logo}>
            Spot Quiz
          </Typography>
          <Button><Link to={'/'} className={classes.navLinks}>Test</Link></Button>
          <Button><Link to={'/question/create'} className={classes.navLinks}>Add Question</Link></Button>
          <Button><Link to={'/questions/index'} className={classes.navLinks}>View All</Link></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavMenu);
