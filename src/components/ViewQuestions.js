import React, { Component } from 'react';
import QuestionList from './QuestionList';

export default class ViewQuestions extends Component {
  render() {
    return (
      <div>
        <h1>Manage questions</h1>
        <QuestionList auth={this.props.auth}/>
      </div>
    )
  }
}
