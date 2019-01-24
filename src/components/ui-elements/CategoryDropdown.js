import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';

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
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.props.onCategoryChange(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <Select
          value={this.props.category}
          onChange={this.handleChange}
          name="category"
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="" disabled>Choose a Category</MenuItem>
          <MenuItem value='javascript'>Javascript</MenuItem>
          <MenuItem value='react'>React</MenuItem>
        </Select>
      </FormControl>
    );
  }
}

CategoryDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryDropdown);
