import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, InputLabel, FormHelperText, CircularProgress, Link } from '@material-ui/core';
import ModalCreateCategory from './ModalCreateCategory';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class CategoryDropdown extends Component {

  constructor(props){
    super(props);

    this.state = {
      createCategoryModalOpen: false,
    }
  }

  openModal = (stateName) => {
    this.setState({
      [stateName]: true,
    })
  }

  closeModal = (stateName) => {
    this.setState({
      [stateName]: false,
    })
  }

  render() {
    const { classes, userCategories, receivedCategories } = this.props;

    if (receivedCategories === false){
      return (
        <>
          <CircularProgress className={classes.progress} />
          <p>Loading categories...</p>
        </>
      );
    } else if (receivedCategories === true && userCategories.length > 0) {
      return (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Choose a category *</InputLabel>
            <Select
              value={this.props.category}
              onChange={this.props.handleCategoryChange}
              name='category'
              required
              className={classes.selectEmpty}
            >
              {this.props.userCategories.map(category =>
                <MenuItem key={category._id} id={category._id} value={category._id}>{category.name}</MenuItem>
              )}
            </Select>

            <FormHelperText>A category comprises a group of questions</FormHelperText>
          </FormControl>
          <Link to='/categories' component={RouterLink} className={classes.link}>Manage Categories</Link>
        </>
      )
    } else if (receivedCategories === true && userCategories.length < 1) {

      return (
        <>
          <p>You haven't created any categories. <Link  className={classes.link} onClick={() => this.openModal('createCategoryModalOpen')}>Create one now</Link> (it takes 10 seconds)</p>
          <ModalCreateCategory
            createCategoryModalOpen={this.state.createCategoryModalOpen}
            closeModal={this.closeModal}
            auth0Id={this.props.auth0Id}
            parentComponent='CategoryDropdown.js'
            setUserData={this.props.setUserData}
          />
        </>
      )
    }
  }
}

CategoryDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryDropdown);
