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
          id: '1', // why is this a string?
          sub_question: '',
          sub_answer: '',
          position: 1
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
    const subQuestion = { id: `${questionCountNew}`, sub_question: '', sub_answer: '', position: questionCountNew };
    const questionIdsArray = this.state.columns['column-1'].questionIds;
    const newQuestionIdsArray = questionIdsArray.concat(questionCountNew);
    // console.log('newQuestionIdsArray');
    // console.log(newQuestionIdsArray);

    this.setState({
      ...this.state,
      questions: {...this.state.questions, [questionCountNew]: subQuestion},
      columns: {'column-1': {id: 'column-1', title: 'Questions', questionIds: newQuestionIdsArray}},
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const question_values = Object.values(this.state.questions);

    if(
      this.state.category !== ''
      && question_values.every(obj => obj.sub_question !== '')
      && question_values.every(obj => obj.sub_answer !== '')
    ) {
      const dataObject = {
        category: this.state.category,
        questions: question_values,
        status: false
      };
      // console.log(dataObject);

      axios.post('http://localhost:3001/api/question/create', dataObject)
        .then(res => console.log(res))
        .catch(error => console.log(error));

        this.setState({
          category: '',
          questions: {
            1: {
              id: '1',
              sub_question: '',
              sub_answer: '',
              position: 1
            },
          },
          columns: {
            'column-1': { id: 'column-1', title: 'Questions', questionIds: [1] }
          },
          columnOrder: ['column-1'],
        });

    } else {
      console.log('One or more of the input fields are blank.')
    }
  }

  // This function reorders the questions in our column
  // It was set up using this tutorial for the react-beautiful-dnd library https://egghead.io/lessons/react-course-introduction-beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    // If there is no destination, abort.
    if (!destination) {
      return;
    }

    // If the starting position and the end position is the same, abort.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Reorder column.questionIds
    const column = this.state.columns[source.droppableId];
    const newQuestionIds = Array.from(column.questionIds);
    newQuestionIds.splice(source.index, 1);
    newQuestionIds.splice(destination.index, 0, parseInt(draggableId));

    // Prepare const columnUpdate for eventual update to this.state.columns
    const columnUpdate = {
      ...column,
      questionIds: newQuestionIds,
    };

    const questionsArrayUpdatePositions = newQuestionIds.map(
      (question_id, arrayIndex) => {
        const adjustArrayIndex = arrayIndex + 1;
        const newQuestion = {
          ...this.state.questions[question_id], position: adjustArrayIndex
        }
        return newQuestion;
      }
    );
    // console.log('questionsArrayUpdatePositions:');
    // console.log(questionsArrayUpdatePositions);

    // Prepare const questionsObject for eventual update to this.state.questions
    let questionsObject = {};

    questionsArrayUpdatePositions.forEach(function(element, index) {
      questionsObject[element.id] = element;
    })

    // console.log('questionsObject');
    // console.log(questionsObject);

    // Prepare const newState for upcoming update to this.state
    const newState = {
      ...this.state,
      questions: questionsObject,
      columns: {
        ...this.state.columns,
        [columnUpdate.id]: columnUpdate,
      }
    };
    // console.log('newState');
    // console.log(newState);
    // Update state
    this.setState(newState);
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Typography component= 'h4' variant='h4' color='secondary'>Add a new question</Typography>
        <CategoryDropdown
          category={this.state.category}
          onCategoryChange={this.handleCategoryChange}
        />
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          console.log('Column:');
          console.log(column);
          const questions = column.questionIds.map(questionId => this.state.questions[questionId]);
          console.log('questions');
          console.log(questions);
          return <Column key={column.id} column={column} questions={questions} updateInput={this.onChangeInput.bind(this)} />;
          })}
        </DragDropContext>
        <Tooltip title="Add New Sub Question" aria-label="Add">
          <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.addSubQuestion}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <Button onClick={this.onSubmit} variant="contained" color="primary" style={{marginTop: 25}}>
          Save Question
        </Button>
      </>
    );
  }
}

export default withStyles(styles)(AddQuestion);
