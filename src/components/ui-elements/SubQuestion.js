import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
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
            <Typography component= 'h6' variant='h6' color='secondary'>Sub Question</Typography>
            <TextField
              id={this.props.question.id.toString()}
              style={{marginTop: 30, marginBottom: 20}}
              name='sub_question'
              onChange={this.props.updateInput}
              label='Question'
              placeholder='Enter your question'
              fullWidth
              multiline={true}
              rows='3'
              margin='normal'
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id={this.props.question.id.toString()}
              name='sub_answer'
              onChange={this.props.updateInput}
              label='Answer'
              placeholder='Enter the answer to the question'
              fullWidth
              multiline={true}
              rows='3'
              margin='normal'
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        )}
      </Draggable>
    )
  }
}

export default withStyles(styles)(SubQuestion);
