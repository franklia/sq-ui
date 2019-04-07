import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Typography, IconButton } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const styles = {
  container: {
     padding: 10,
     border: '1px solid lightgrey',
     marginBottom: 10,
     background: '#fff',
  },
  heading: {
    float: 'left',
  },
  deleteIcon: {
    float: 'right',
  }
};

class SubQuestion extends Component {

  handleClickOpen = (id) => {
    this.setState({
      dialogOpen: true,
      deleteId: id
    });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { classes } = this.props;
    const deleteIcon = (
      <IconButton className={classes.deleteIcon}>
        <DeleteForeverIcon
          id={this.props.question.id}
          onClick={() => this.props.deleteSubQuestion(this.props.question.id)}
        />
      </IconButton>
    );
    // console.log(deleteIcon);

    return (
      <Draggable draggableId={this.props.question.id} index={this.props.index}>
        {(provided) => (
          <div className={classes.container}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Typography className={classes.heading} component= 'h6' variant='h6' color='secondary'>Sub Question</Typography>
            { this.props.displayDeleteIcon === true ? deleteIcon : null }
            <TextField
              id={this.props.question.id.toString()}
              style={{marginTop: 30, marginBottom: 20}}
              name='sub_question'
              onChange={this.props.updateInput}
              label='Question'
              value={this.props.question.sub_question}
              placeholder='Enter your question'
              required={true}
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
              value={this.props.question.sub_answer}
              placeholder='Enter the answer to the question'
              required={true}
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
