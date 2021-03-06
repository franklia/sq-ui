import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core';

const styles = theme => ({
  root: {
  },
});

class ModalUpdateCategory extends Component {

  updateCategory = () => {
    const dataObject = {
      auth0Id: this.props.auth0Id,
      updateOrDeleteCategoryId: this.props.updateOrDeleteCategoryId,
      updateCategoryName: this.props.updateCategoryName,
    }

    axios.put(`${process.env.REACT_APP_API_URI}/user/category/update`, dataObject)
      .then(res => {
        this.props.setUserData(this.props.auth0Id);
        this.props.closeModal('updateCategoryModalOpen');
      })
      .catch(error => console.log(error));
  };

  render() {

    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.updateCategoryModalOpen}
        onClose={this.props.closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update Category</DialogTitle>
        <DialogContent>
        <TextField
           id='outlined-name'
           label='Update category name'
           className={classes.root}
           value={this.props.updateCategoryName}
           onChange={this.props.handleCategoryTextChange('updateCategoryName')}
           margin='normal'
           variant='outlined'
        />
        </DialogContent>
        <DialogActions className='modalActionsRoot'>
          <Button
            className='modalButton modalCancelOption'
            onClick={() => this.props.closeModal('updateCategoryModalOpen')}
            color="primary">
              Cancel
          </Button>
          <Button
            className='modalButton modalConfirmOption'
            onClick={this.updateCategory}
            color="primary"
            autoFocus>
              Yes
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ModalUpdateCategory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalUpdateCategory);
