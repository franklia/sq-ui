import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
// import loading from './loading.svg';

const styles = theme => ({
  root: {
    margin: 'auto',
    display: 'block'
  },
  loadingText: {
    textAlign: 'center',
  },
});

class Callback extends Component {
  render() {

    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <CircularProgress className={classes.root} />
        <h4 className={classes.loadingText}>Checking login credentials..</h4>
      </div>
    );
  }
}

export default withStyles(styles)(Callback);
