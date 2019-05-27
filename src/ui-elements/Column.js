import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import SubQuestion from './SubQuestion';

const styles = theme => ({
  root: {
  },
});

class Column extends Component {
  render() {
    return (
      <div>
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.props.questions.map((subQuestion, index) =>
                <SubQuestion
                  key={subQuestion.id}
                  question={subQuestion}
                  index={index}
                  updateInput={this.props.updateInput}
                  deleteSubQuestion={this.props.deleteSubQuestion}
                  displayHeadingAndDeleteIcon={this.props.displayHeadingAndDeleteIcon}
                />)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    )
  }
}

export default withStyles(styles)(Column);
