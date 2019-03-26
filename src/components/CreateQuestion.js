import React, { Component } from 'react';
import CreateOrUpdateQuestion from './CreateOrUpdateQuestion';
import { Typography, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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
    return (
      <div style={{marginTop: 10}}>
        <Typography component="h4" variant='h4' color='secondary'>Add a question</Typography>
        <CreateOrUpdateQuestion type='create' buttonText='Save' postUrl='http://localhost:3001/api/question/create'/>
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

export default CreateQuestion;
