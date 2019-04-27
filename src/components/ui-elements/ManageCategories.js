import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

const styles = theme => ({
  root: {

  },
});

class ManageCategories extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Title</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleModalClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

ManageCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageCategories);
