import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, InputLabel, FormHelperText } from '@material-ui/core';

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

class CategoryDropdown extends React.Component {



  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel>Choose a category</InputLabel>
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
    );
  }
}

CategoryDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryDropdown);
