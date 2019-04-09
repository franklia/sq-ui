import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import loading from './loading.svg';

const styles = theme => ({
  wrapper: {
    margin: 'auto',
  },
});

class Callback extends Component {
  render() {

    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <img src={loading} alt="loading"/>
        <h4>Loading...</h4>
      </div>
    );
  }
}

export default withStyles(styles)(Callback);
