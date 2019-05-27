import React, { Component } from 'react';
import QuestionList from '../ui-elements/QuestionList';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  pageContainer: {
    margin: '0 30px',
  },
});

class ManageQuestions extends Component {
  render() {

    const { classes } = this.props;

    return (
      <div className={classes.pageContainer}>
        <h1>Manage questions</h1>
        <QuestionList auth={this.props.auth}/>
      </div>
    )
  }
}

ManageQuestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageQuestions);
