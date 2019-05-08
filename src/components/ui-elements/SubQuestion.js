import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Typography, IconButton } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DragIndicator from '@material-ui/icons/DragIndicator';

const styles = {
  container: {
   // padding: '20px 30px',
   marginBottom: 20,
   borderRadius: 8,
   boxShadow: '0 8px 15px rgba(125,147,178,.25)',
   background: '#fff',
   transition: 'all .3s',
   '&:hover': {
     boxShadow: '0 20px 30px rgba(125,147,178,.15)',
    }
  },
  questionAndAnswerContainer: {
    padding: '20px 30px',
  },
  headingContainer: {
    backgroundColor: '#aec6e8',
    padding: '11px 30px 0',
    minHeight: 53,
    borderRadius: '8px 8px 0 0',

  },
  heading: {
    float: 'left',
    paddingLeft: 3,
    color: '#fff',
  },
  dragIndictorIcon: {
    float: 'left',
    position: 'relative',
    top: 3,
  },
  deleteIcon: {
    float: 'right',
    position: 'relative',
    bottom: '8px',
    left: '7px',
    color: '#627a9c',
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
    const headingAndDeleteIcon = (
      <div className={classes.headingContainer}>
        <DragIndicator className={classes.dragIndictorIcon} />
        <Typography className={classes.heading} component= 'h6' variant='h6' color='secondary'>Sub Question</Typography>
        <IconButton className={classes.deleteIcon}>
          <DeleteForeverIcon
            id={this.props.question.id}
            onClick={() => this.props.deleteSubQuestion(this.props.question.id)}
          />
        </IconButton>
      </div>
    );

    return (
      <Draggable draggableId={this.props.question.id} index={this.props.index}>
        {(provided) => (
          <div className={classes.container}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            { this.props.displayHeadingAndDeleteIcon === true ? headingAndDeleteIcon : null }
            <div className={classes.questionAndAnswerContainer}>
              <TextField
                id={this.props.question.id.toString()}
                style={{marginTop: 10, marginBottom: 20}}
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
          </div>
        )}
      </Draggable>
    )
  }
}

export default withStyles(styles)(SubQuestion);
