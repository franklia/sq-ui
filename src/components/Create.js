import React, { Component } from 'react';
import axios from 'axios';
import CategoryDropdown from './ui-elements/CategoryDropdown';
import { TextField, Typography } from '@material-ui/core';

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
      axios.post('http://localhost:3001/api/create', dataObject)
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
        <Typography component="h2" variant="h3" gutterBottom color='secondary'>Add A New Question</Typography>
            <form onSubmit={this.onSubmit}>
              <CategoryDropdown
                category={this.state.category}
                onCategoryChange={this.handleCategoryChange}
              />

              <TextField
                name="question"
                question={this.state.question}
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
                question={this.state.answer}
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

              <div className="form-group">
                  <input type="submit" value="Save Question" className="btn btn-primary"/>
              </div>
            </form>
        </div>
      )
  }
}
