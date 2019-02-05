import React, { Component } from 'react';
import QuestionList from './QuestionList';
import { Typography } from '@material-ui/core';

export default class GetQuestions extends Component {
  render() {
    return (
      <div>
        <Typography component='h4' variant='h4' color='secondary'>All questions</Typography>
        <QuestionList />
      </div>
    )
  }
}