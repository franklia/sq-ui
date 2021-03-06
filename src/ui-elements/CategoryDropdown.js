import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select, Button, InputLabel, FormHelperText, CircularProgress, Link } from '@material-ui/core';
import ModalCreateCategory from './ModalCreateCategory';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: '0 0 40px 0',
    width: 350,
  },
  manageCategoriesButton: {
    border: '1px solid #ceddf2',
    backgroundColor: '#EFF6FF',
    fontWeight: 600,
    textDecoration: 'none',
    fontSize: 14,
    display: 'inline-flex',
    color: '#7d93b2',
    textTransform: 'capitalize',
    borderRadius: '8px',
    boxShadow: 'none',
    padding: '4px 20px',
    '&:hover': {
      backgroundColor: '#9eb4d2',
      borderColor: '#9eb4d2',
      color: '#fff',
    },
    margin: '15px 0 0 40px',
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
          <CircularProgress />
          <p>Loading categories...</p>
        </>
      );
    } else if (receivedCategories === true && userCategories.length > 0) {
      return (
        <>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="age-native-required">Choose a category</InputLabel>
            <Select
              value={this.props.category}
              onChange={this.props.handleCategoryChange}
              name='category'
              required
              native={true}
              inputProps={{
                id: 'age-native-required',
              }}
            >
              <option value=''></option>
              {this.props.userCategories.map(category =>
                <option key={category._id} id={category._id} value={category._id}>{category.name}</option>
              )}
            </Select>
            <FormHelperText>Categories contains questions on a similar theme (e.g. Javascript)</FormHelperText>
          </FormControl>
          <Button component={RouterLink} to='/categories' className={classes.manageCategoriesButton}>Manage Categories</Button>

        </>
      )
    } else if (receivedCategories === true && userCategories.length < 1) {

      return (
        <>
          <p>You haven't created any categories.
          <Link className={classes.link} onClick={() => this.openModal('createCategoryModalOpen')}> Create one now</Link> (it takes 10 seconds)</p>
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
