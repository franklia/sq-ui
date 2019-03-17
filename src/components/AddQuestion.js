import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './ui-elements/Column';

const styles = theme => ({
  root: {
    // width: '100%',
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
          question: 'First Question',
          answer: 'First Answer'
        },
        2: {
          id: 2,
          question: 'Second Question',
          answer: 'Second Answer'
        }
      },
      columns: {
        'column-1': { id: 'column-1', title: 'Questions', questionIds: [1, 2] }
      },
      columnOrder: ['column-1'],
    }
  }

  // This function reorders our column
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
    // const { classes } = this.props;

    return (
      <>
        <h3>Add Question</h3>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const questions = column.questionIds.map(questionId => this.state.questions[questionId]);

          return <Column key={column.id} column={column} questions={questions} />;
          })}
        </DragDropContext>
      </>
    );
  }

}

export default withStyles(styles)(AddQuestion);
