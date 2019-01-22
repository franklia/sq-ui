import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft: '10px',
    marginRight: '10px',
  },
  table: {
    minWidth: 700,
  },
});

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quizQuestionsData: [],
    };
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  componentDidMount() {
    this.getData();
  }

  // fetch data from database
  getData = () => {
    axios.get('http://localhost:3001/api/questions/index')
      .then((res) => {
        console.log(res.data);
        this.setState({quizQuestionsData: res.data});
      }
    )
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
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizQuestionsData.map(quizQuestion => (
              <TableRow key={quizQuestion._id}>
                <TableCell>{quizQuestion.category}</TableCell>
                <TableCell>{quizQuestion.question}</TableCell>
                <TableCell>{quizQuestion.answer}</TableCell>
                <TableCell className='link'>
                  <Link to={`/questions/${quizQuestion._id}`} className="nav-link">Why
                    <EditIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

QuestionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionList);
