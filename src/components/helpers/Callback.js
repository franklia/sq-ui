import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import loading from './loading.svg';

const styles = theme => ({
  loadingImg: {
    margin: 'auto',
    display: 'block',
    paddingTop: 60
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
        <img src={loading} className={classes.loadingImg} alt="loading"/>
        <h4 className={classes.loadingText}>Loading...</h4>
      </div>
    );
  }
}

export default withStyles(styles)(Callback);
