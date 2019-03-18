import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CategoryDropdown from './ui-elements/CategoryDropdown';
import { Typography, Tooltip, Fab, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './ui-elements/Column';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
});

class AddQuestion extends Component {
  constructor(props){
    super(props);

    this.state = {
      category: '',
      questions: {
        1: {
          id: 1,
          question: '',
          answer: ''
        },
      },
      columns: {
        'column-1': { id: 'column-1', title: 'Questions', questionIds: [1] }
      },
      columnOrder: ['column-1'],
    }
  }

  handleCategoryChange = category => {
    this.setState({
      category: category
    })
  }

  onChangeInput = event => {
    const questionId = event.target.id;
    const key = event.target.name;
    const value = event.target.value;
    let question = {...this.state.questions[questionId], [key]: value};
    this.setState({
      ...this.state,
      questions: {...this.state.questions, [questionId]: question}
    });
  }

  addSubQuestion = () => {
    const questionsObject = this.state.questions;
    const questionCountInitial = Object.keys(questionsObject).length;
    const questionCountNew = questionCountInitial + 1;
    const subQuestion = { id: questionCountNew, question: '', answer: ''};
    const questionIdsArray = this.state.columns['column-1'].questionIds;
    const newQuestionIdsArray = questionIdsArray.concat(questionCountNew);

    this.setState({
      ...this.state,
      questions: {...this.state.questions, [questionCountNew]: subQuestion},
      columns: {'column-1': {id: 'column-1', title: 'Questions', questionIds: newQuestionIdsArray}},
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const dataObject = this.state;

    if(dataObject.category){
      axios.post('http://localhost:3001/api/question/create', dataObject)
          // ES6 syntax
          .then(res => console.log(res))
          // regular syntax
          .catch(function(error) {
              console.log(error)
          });

      this.setState({
        category: '',
        question: '',
        answer: ''
      })
    } else {
      console.log('One or more of the input fields are blank.')
    }
  }

  // This function reorders the questions in our column
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newQuestionIds = Array.from(column.questionIds);
    newQuestionIds.splice(source.index, 1);
    newQuestionIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      questionIds: newQuestionIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      }
    };

    this.setState(newState);
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Typography component= 'h4' variant='h4' color='secondary'>Add a new question</Typography>
        <form onSubmit={this.onSubmit}>
          <CategoryDropdown
            category={this.state.category}
            onCategoryChange={this.handleCategoryChange}
          />
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const questions = column.questionIds.map(questionId => this.state.questions[questionId]);
            return <Column key={column.id} column={column} questions={questions} updateInput={this.onChangeInput.bind(this)} />;
            })}
          </DragDropContext>
          <Tooltip title="Add New Sub Question" aria-label="Add">
            <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.addSubQuestion}>
              <AddIcon />
            </Fab>
          </Tooltip>
          <Button type="submit" variant="contained" color="primary" style={{marginTop: 25}}>
            Save Question
          </Button>
        </form>
      </>
    );
  }
}

export default withStyles(styles)(AddQuestion);
