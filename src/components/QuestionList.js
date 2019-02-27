import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
});

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      quizQuestionsData: [],
      deleteId: '',
      dialogOpen: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get('http://localhost:3001/api/questions/index')
      .then((res) => {
        this.setState({quizQuestionsData: res.data});
      }
    )
      .catch(error => console.log(error))
  };

  handleClickOpen = (id) => {
    this.setState({
      dialogOpen: true,
      deleteId: id
    });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  deleteQuestion = () => {
    console.log(this.state.deleteId);
    axios.delete(`http://localhost:3001/api/question/delete/${this.state.deleteId}`)
      .then(() => {
        this.setState({dialogOpen: false});
        this.getData();
      })
      .catch(error => console.log(error))
  };

  render() {
    const { classes } = this.props;
    const { quizQuestionsData } = this.state;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizQuestionsData.map(quizQuestion => (
              <TableRow key={quizQuestion._id}>
                <TableCell>{quizQuestion.category}</TableCell>
                <TableCell>{quizQuestion.question}</TableCell>
                <TableCell>{quizQuestion.answer}</TableCell>
                <TableCell>{quizQuestion.status.toString()}</TableCell>
                <TableCell className='link'>
                  <Link href={`/question/${quizQuestion._id}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                </TableCell>
                <TableCell className='link'>
                  <IconButton>
                    <DeleteForeverIcon
                      onClick={() => this.handleClickOpen(quizQuestion._id)}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
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
            <Button onClick={this.handleClose} color="primary">
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

QuestionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionList);
