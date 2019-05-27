import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreateOrUpdateQuestion from '../ui-elements/CreateOrUpdateQuestion';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  pageContainer: {
    margin: '0 30px',
  },
});

class CreateQuestion extends Component {

  constructor(props){
    super(props);

    this.state = {
      open: false
    };
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  }

  handleClose = () => {
      this.setState({
        open: false
      });
  }

  render(){

    const { classes } = this.props;

    return (
      <div className={classes.pageContainer}>
        <h1>Add a question</h1>
        <CreateOrUpdateQuestion auth={this.props.auth} type='create' buttonText='Save' postUrl='http://localhost:3001/api/question/create'/>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">The question has been updated</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className="close"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

CreateQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateQuestion);
