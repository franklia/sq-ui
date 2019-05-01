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
  DialogContentText
} from '@material-ui/core';

const styles = theme => ({
  root: {

  },
});

class ModalDeleteCategory extends Component {

  deleteCategory = () => {
    const dataObject = {
      auth0Id: this.props.auth0Id,
      updateOrDeleteCategoryId: this.props.updateOrDeleteCategoryId,
    }

    axios.put('http://localhost:3001/api/user/category/delete', dataObject)
      .then(res => {
        this.props.setUserData(this.props.auth0Id);
        this.props.closeModal('deleteCategoryModalOpen');
      })
      .catch(error => console.log(error));
  };

  render() {

    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.deleteCategoryModalOpen}
        onClose={this.props.closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you wish to delete this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.closeModal('deleteCategoryModalOpen')} color="primary">
            No
          </Button>
          <Button onClick={this.deleteCategory} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ModalDeleteCategory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalDeleteCategory);
