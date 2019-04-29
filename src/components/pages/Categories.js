import React, { Component } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ConfirmUserCredentials from '../helpers/ConfirmUserCredentials.js';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ModalCreateCategory from '../ui-elements/ModalCreateCategory';

const styles = theme => ({
  narrowCells: {
    width: '15%',
  },
});

class Categories extends Component {
  constructor(props){
    super(props);

    this.state = {
      auth0Id: '',
      receivedCategories: false,
      userCategories: [],
      CreateCategoryModalOpen: false,
    }
  }

  componentDidMount = () => {
    const { auth } = this.props;
    ConfirmUserCredentials(auth, this.setUserData, () => {});
  }

  setUserData = id => {
    axios.get('http://localhost:3001/api/user/categories?', { params: { auth0Id: id } })
      .then((res) => {
        if (res.data.length < 1){
          this.setState({
            ...this.state,
            auth0Id: id,
            receivedCategories: true
          })
        } else {
          this.setState({
            ...this.state,
            auth0Id: id,
            userCategories: res.data[0].categories,
            receivedCategories: true
          })
        }
      })
      .catch(error => console.log(error))
  }

  openCreateModal = () => {
    this.setState({
      CreateCategoryModalOpen: true,
    })
  }

  closeCreateModal = (name) => {
    this.setState({
      CreateCategoryModalOpen: false,
    })
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <h1>Manage Categories</h1>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell className={classes.narrowCells} align='center'>Edit</TableCell>
                <TableCell className={classes.narrowCells} align='center'>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.userCategories.map(category => (
                <TableRow key={category._id}>
                  <TableCell className={classes.category}>
                    {category.name}
                  </TableCell>
                  <TableCell className='link' align='center'>
                    <IconButton>
                      <EditIcon onClick={() => {}} />
                    </IconButton>
                  </TableCell>
                  <TableCell className='link' align='center'>
                    <IconButton>
                      <DeleteForeverIcon onClick={() => this.openDeleteModal(category._id)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Button onClick={this.openCreateModal} variant='contained' color='primary' style={{marginTop: 25}} type='button'>
          Add New Category
        </Button>
        <ModalCreateCategory
          CreateCategoryModalOpen={this.state.CreateCategoryModalOpen}
          closeCreateModal={this.closeCreateModal}
          auth0Id={this.state.auth0Id}
          setUserData={this.setUserData}
        />
      </div>
    );
  }
}

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categories);
