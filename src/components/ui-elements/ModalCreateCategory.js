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
  DialogContentText,
  TextField
} from '@material-ui/core';

const styles = theme => ({
  root: {

  },
});

class ModalCreateCategory extends Component {
  constructor(props){
    super(props);

    this.state = {
      categoryName: '',
    }
  };

  createCategory = () => {
    const dataObject = {
      auth0Id: this.props.auth0Id,
      categoryName: this.state.categoryName,
    }

    console.log(dataObject);

    axios.put('http://localhost:3001/api/user/category/create', dataObject)
      .then(res => {
        console.log(res);
        this.props.setUserData(this.props.auth0Id);
        this.props.closeModal('createCategoryModalOpen');
      })
      .catch(error => console.log(error));
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {

    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.createCategoryModalOpen}
        onClose={this.props.closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create New Category</DialogTitle>
        <DialogContentText>Categories are used to group questions so that you can focus on that category during a test</DialogContentText>
        <DialogContent>
          <TextField
            id='outlined-name'
            label='Enter category name'
            className={classes.root}
            value={this.state.categoryName}
            onChange={this.handleChange('categoryName')}
            margin='normal'
            variant='outlined'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.closeModal('createCategoryModalOpen')} color="primary">
            Cancel
          </Button>
          <Button onClick={this.createCategory} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ModalCreateCategory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalCreateCategory);
