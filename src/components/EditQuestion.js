import React, { Component } from 'react';
import CreateOrUpdateQuestion from './ui-elements/CreateOrUpdateQuestion';
import { Typography, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

class EditQuestion extends Component {

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
      <>
        <h1>Edit question</h1>
        <CreateOrUpdateQuestion auth={this.props.auth} type='update' buttonText='Update' id={this.props.match.params.id} postUrl='http://localhost:3001/api/question/:id'/>
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
      </>
    );
  }
}

export default EditQuestion;
