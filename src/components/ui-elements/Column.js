import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import SubQuestion from './SubQuestion';

const styles = theme => ({
  root: {
    // width: '100%',
  },
});

class Column extends Component {
  render() {
    // const { classes } = this.props;
    return (
      <div>
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.props.questions.map((question, index) =>
                <SubQuestion
                  key={question.id}
                  question={question}
                  index={index}
                  updateInput={this.props.updateInput}
                  deleteSubQuestion={this.props.deleteSubQuestion}
                  displayDeleteIcon={this.props.displayDeleteIcon}
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
