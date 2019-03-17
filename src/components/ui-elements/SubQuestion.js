import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';

const styles = {
  container: {
     padding: 10,
     border: '1px solid lightgrey',
     marginBottom: 10,
     background: '#fff',
  },
};

class SubQuestion extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Draggable draggableId={this.props.question.id} index={this.props.index}>
        {(provided) => (
          <div className={classes.container}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p>{this.props.question.question}</p>
            <p>{this.props.question.answer}</p>
          </div>
        )}
      </Draggable>
    )
  }
}

export default withStyles(styles)(SubQuestion);
