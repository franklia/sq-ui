import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ConfirmUserCredentials from './helpers/ConfirmUserCredentials.js';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link as RouterLink } from 'react-router-dom';
import {
  TableRow,
  Paper,
  TableHead,
  TableCell,
  TableBody,
  Table,
  IconButton,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  category: {
    textTransform: 'capitalize',
  }
});

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionsData: [],
      auth0_id: '',
      deleteId: '',
      dialogOpen: false,
    };
  }

  componentDidMount = () => {
    const { auth } = this.props;
    ConfirmUserCredentials(auth, this.setAuth0Id, this.getQuestions);
  }

  setAuth0Id = id => {
    this.setState({ auth0_id: id })
  }

  getQuestions = (userId) => {
    axios.get('http://localhost:3001/api/questions/index', { params: { userId: userId } })
      .then((res) => {
        this.setState({questionsData: res.data});
      }
    )
      .catch(error => console.log(error))
  };

  openDeleteModal = (id) => {
    this.setState({
      dialogOpen: true,
      deleteId: id
    });
  };

  closeModal = () => {
    this.setState({ dialogOpen: false });
  };

  deleteQuestion = () => {
    this.setState({dialogOpen: false});
    axios.delete(`http://localhost:3001/api/question/delete/${this.state.deleteId}`)
      .then(() => {
          // This causes component to re-mount and data to be updated
          this.getQuestions(this.state.auth0_id);
        })
      .catch(error => console.log(error))
  };

  render() {
    const { classes } = this.props;
    const { questionsData } = this.state;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Questions</TableCell>
              <TableCell>Answers</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionsData.map(question => (
              <TableRow key={question._id}>
                <TableCell className={classes.category}>{question.category}</TableCell>
                <TableCell>
                  {question.questions.map((question, index) => {
                    let adjustedIndex = index + 1;
                    return ` ${adjustedIndex}. ${question.sub_question}`;
                  })}
                </TableCell>
                <TableCell>
                  {question.questions.map((question, index) => {
                    let adjustedIndex = index + 1;
                    return ` ${adjustedIndex}. ${question.sub_answer}`;
                  })}
                </TableCell>
                <TableCell>{question.status.toString()}</TableCell>
                <TableCell className='link'>
                  <Link component={RouterLink} to={`/question/${question._id}`} >
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                </TableCell>
                <TableCell className='link'>
                  <IconButton>
                    <DeleteForeverIcon
                      onClick={() => this.openDeleteModal(question._id)}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.closeModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Question</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you wish to delete this question?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal} color="primary">
              No
            </Button>
            <Button onClick={this.deleteQuestion} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

// are propTypes required for material ui??
QuestionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionList);
