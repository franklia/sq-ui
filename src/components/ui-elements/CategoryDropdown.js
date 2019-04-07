import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select,} from '@material-ui/core';

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
        <Select
          value={this.props.category}
          onChange={this.props.handleCategoryChange}
          name='category'
          displayEmpty
          native
          required
          className={classes.selectEmpty}
        >
          <option value='' disabled>Choose a Category</option>
          <option value='javascript'>Javascript</option>
          <option value='react'>React</option>
        </Select>
      </FormControl>
    );
  }
}

CategoryDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryDropdown);
