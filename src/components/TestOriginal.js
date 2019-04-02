import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Typography, Button, TextField } from '@material-ui/core';
import axios from 'axios';

export default class Test extends Component {

  constructor(props) {
    super(props);
    // this.setCategory = this.setCategory.bind(this);

    this.state = {
      questionData: [],
      allCategories: [],
      testCategory: ''
    }
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    axios.get('http://localhost:3001/api/questions/index/category')
      .then((res) => {
        this.setState({allCategories: res.data});
      }
    )
      .catch(error => console.log(error))
  };

  getQuestion = () => {
    const { testCategory } = this.state;
    axios.get(`http://localhost:3001/api/question/test/${testCategory}`)
      .then((res) => {
        this.setState({questionData: res.data}, () => console.log(this.state));
      }
    )
      .catch(error => console.log(error))
  };

  setCategory = category => {
    this.setState({ testCategory: category }, () => {
      this.getQuestion();
    });
  };

  resetCategory = () => {
    this.setState({
      testCategory: '',
      quizQuestionData: []
    });
  }

  renderHeader = () => {
    if(this.state.testCategory === undefined || this.state.testCategory === '') {
      return (
        <div>
          <Typography component='h4' variant='h4' color='secondary'>Choose a category to test</Typography>
          {this.state.allCategories.map(category => (
            <Button key={category} name={category} onClick={() => this.setCategory(category)} variant="contained" color="primary" style={{marginTop: 25, marginRight: 15}}>
              {category}
            </Button>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <Typography component='h4' variant='h4' color='secondary'>Currently testing {this.state.testCategory}</Typography>
          <span style={{cursor: 'pointer', color: 'blue'}} onClick={this.resetCategory}>(change category)</span>
        </div>
      );
    }
  };

  renderNewQuestion = () => {
    // const removeAnswer = null;
    ReactDOM.render(null, document.getElementById('answer'));
    this.getQuestion();
  };

  renderAnswer = () => {
    const answerContent = (
      <div>
        <p style={{whiteSpace: 'pre-line'}}>{this.state.questionData.questions[0].sub_answer}</p>
        <Button onClick={this.renderNewQuestion} variant="contained" color="secondary" style={{marginTop: 25, marginRight: 15}}>New Question</Button>
      </div>
    );

    ReactDOM.render(answerContent, document.getElementById('answer'));
  };

  renderQuestion = () => {
    if(this.state.questionData === undefined || this.state.questionData.length === 0) {
      return null;
    } else {
      return (
        <div>
          <p style={{marginTop: 35, whiteSpace: 'pre-line'}}>{this.state.questionData.questions[0].sub_question}</p>
          <Button onClick={this.renderAnswer} variant="contained" color="secondary" style={{marginTop: 25, marginRight: 15}}>Reveal Answer</Button>
        </div>
      );
    }
  };

  // renderQuestion = () => {
  //   if(this.state.questionData === undefined || this.state.questionData.length === 0) {
  //     return null;
  //   } else {
  //     return (
  //       <div>
  //         <p style={{marginTop: 35, whiteSpace: 'pre-line'}}>{this.state.questionData.questions[0].sub_question}</p>
  //         <Button onClick={this.renderAnswer} variant="contained" color="secondary" style={{marginTop: 25, marginRight: 15}}>Reveal Answer</Button>
  //       </div>
  //     );
  //   }
  // };

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderQuestion()}
        <div id='answer' style={{marginTop: 35}}></div>
      </div>
    )
  }
}
