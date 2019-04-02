import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
    fontSize: 16,
    display: 'inline-flex',
    color: theme.palette.secondary.dark,
    textTransform: 'capitalize',
  },
  schoolIcon: {
    fontSize: 60,
    marginTop: 23,
    marginRight: 15,
  }
});

function NavMenu(props) {
  const { classes } = props;
  return (
    <div className={classes.navBar}>
      <SchoolIcon color='primary' className={classes.schoolIcon}/>
      <h1 className={classes.logo}>Spot Quiz</h1>
      <Button><Link to={'/'} className={classes.navLinks}>Test</Link></Button>
      <Button><Link to={'/question/create'} className={classes.navLinks}>Add Question</Link></Button>
      <Button><Link to={'/questions/index'} className={classes.navLinks}>View All</Link></Button>
    </div>
  );
}

NavMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavMenu);
