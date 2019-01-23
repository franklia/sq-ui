import React, { Component } from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class EditQuestion extends Component {

  constructor(props) {
    super(props);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
          _id: "",
          category: "",
          question: "",
          answer: "",
          open: false
    };
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  componentDidMount() {
    this.getData();
  }

  // fetch data from database
  getData = () => {
    axios.get('http://localhost:3001/api/questions/'+this.props.match.params.id)
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

    onChangeCategory(event) {
      this.setState({
        category: event.target.value
      });
    }

    onChangeQuestion(event) {
      this.setState({
        question: event.target.value
      })
    }

    onChangeAnswer(event) {
      this.setState({
        answer: event.target.value
      })
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
              <h3>Edit Question</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Category:  </label>
                      <input type="text" className="form-control" value={this.state.category} onChange={this.onChangeCategory}/>
                  </div>
                  <div className="form-group">
                      <label>Question: </label>
                      <textarea type="text" className="form-control" value={this.state.question} onChange={this.onChangeQuestion}/>
                  </div>
                  <div className="form-group">
                      <label>Answer: </label>
                      <textarea type="text" className="form-control" value={this.state.answer} onChange={this.onChangeAnswer}/>
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Update Question" className="btn btn-primary"/>
                  </div>
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
