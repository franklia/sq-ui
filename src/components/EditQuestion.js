import React, { Component } from 'react';
import axios from 'axios';
import { Typography, Snackbar, IconButton, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CategoryDropdown from './ui-elements/CategoryDropdown';

class EditQuestion extends Component {

  constructor(props) {
    super(props);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: '',
      category: '',
      question: '',
      answer: '',
      open: false
    };
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  componentDidMount() {
    this.getData();
  }

  // fetch data from database
  getData = () => {
    axios.get('http://localhost:3001/api/question/'+this.props.match.params.id)
      .then((res) => {
        this.setState({
          _id: res.data[0]._id,
          category: res.data[0].category,
          question: res.data[0].question,
          answer: res.data[0].answer
        });
      }
    )
      .catch(error => console.log(error))
  };

    handleCategoryChange = category => {
      this.setState({
        category: category
      })
    }

    onChangeInput = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    onSubmit(event) {
      event.preventDefault();
      const dataObject = {
        _id: this.state._id,
        category: this.state.category,
        question: this.state.question,
        answer: this.state.answer
      };

      if(dataObject.category && dataObject.question && dataObject.answer){
        axios.post(`http://localhost:3001/api/question/${dataObject._id}`, dataObject)
            // ES6 syntax
            .then(res => console.log(res))
            .then(this.handleClick())
            // regular syntax
            .catch(function(error) {
                console.log(error)
            });
      } else {
        console.log('One or more of the input fields are blank.')
      }
    }

    // Snackbar handlers
    handleClick = () => {
      this.setState({
        open: true
      });
    }

    handleClose = () => {
        this.setState({
          open: false
        });
    }

    render(){
        return (
          <div style={{marginTop: 10}}>
              <Typography component="h4" variant='h4' color='secondary'>Edit Question</Typography>
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
                    Update Question
                  </Button>
              </form>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={5000}
                onClose={this.handleClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">The question has been updated</span>}
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className="close"
                    onClick={this.handleClose}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
          </div>
        );
    }
}

export default EditQuestion
