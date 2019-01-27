import React, { Component } from 'react';
import axios from 'axios';
import CategoryDropdown from './ui-elements/CategoryDropdown';
import { TextField, Typography, Button } from '@material-ui/core';

export default class Create extends Component {

  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        category: '',
        question: '',
        answer: ''
    }
  }

  onChangeInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCategoryChange = category => {
    this.setState({
      category: category
    })
  }

  onSubmit(event) {
    event.preventDefault();
    // console.log(`The values are ${this.state.category}, ${this.state.question}, and ${this.state.answer}`)
    const dataObject = {
      category: this.state.category,
      question: this.state.question,
      answer: this.state.answer
    };

    if(dataObject.category && dataObject.question && dataObject.answer){
      axios.post('http://localhost:3001/api/question/create', dataObject)
          // ES6 syntax
          .then(res => console.log(res))
          // regular syntax
          .catch(function(error) {
              console.log(error)
          });

      this.setState({
        category: '',
        question: '',
        answer: ''
      })
    } else {
      console.log('One or more of the input fields are blank.')
    }

  }

  render() {
      return (
        <div>
          <Typography component= 'h4' variant='h4' color='secondary'>Add A New Question</Typography>
          <form onSubmit={this.onSubmit}>
            <CategoryDropdown
              category={this.state.category}
              onCategoryChange={this.handleCategoryChange}
            />
            <TextField
              style={{marginTop: 30, marginBottom: 20}}
              name="question"
              value={this.state.question}
              onChange={this.onChangeInput}
              label="Question"
              placeholder="Enter your question"
              fullWidth
              multiline={true}
              rows='5'
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-full-width"
              name="answer"
              value={this.state.answer}
              onChange={this.onChangeInput}
              label="Answer"
              placeholder="Enter the answer to the question"
              fullWidth
              multiline={true}
              rows='5'
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button type="submit" variant="contained" color="primary" style={{marginTop: 25}}>
              Save Question
            </Button>
          </form>
        </div>
      )
  }
}
